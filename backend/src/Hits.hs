{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE GADTs #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE DerivingStrategies #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE StandaloneDeriving #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE DataKinds #-}

-- the "hits" feature: a human-traffic tracker (was: a bare counter).
-- this module owns everything hits-related: its schema, its migration,
-- and its routes. Main just mounts what we export here.
--
-- a Hit is one page request from a js-capable client. every page fires it, so
-- we can later reconstruct each visitor's path through the site keyed on `ip`.
-- a page's count is NOT stored -- it's just how many Hit rows share that path,
-- computed on demand (see countHits). recording and counting are split into two
-- endpoints by intent: POST /hit writes one row, GET /hit reads the count.
module Hits
    ( Hit(..)
    , migrateHits
    , recordHit
    , hitRoutes
    ) where

import Web.Scotty
-- persistent's query fns 'get' and 'delete' collide with scotty's HTTP verbs.
-- we use scotty's here, so hide persistent's (we don't need them in this module).
import Database.Persist.Sqlite hiding (get, delete)
import Database.Persist.TH
import Data.Aeson (object, (.=))
import Data.Time (UTCTime, getCurrentTime)
import Data.Maybe (fromMaybe)
import Data.Text (Text)
import qualified Data.Text.Lazy as TL
import Text.Read (readMaybe)

-- the typed schema for this feature. mkMigrate emits 'migrateHits', which
-- Main runs on boot to bring the sqlite table in line with these types.
--
-- nullability is deliberate, not lazy: the text fields are non-null because a
-- string always has a meaningful empty value ("" = "direct"/"none"), while
-- lat/lng are the only Maybes because a Double has no honest empty (0,0 is a
-- real place in the gulf of guinea), so a missing geoip value must be Nothing.
share [mkPersist sqlSettings, mkMigrate "migrateHits"] [persistLowerCase|
Hit
    time      UTCTime
    path      Text          -- location.pathname  (which page fired it)
    referer   Text          -- document.referrer  ("" = direct / suppressed)
    userAgent Text          -- the User-Agent header
    ip        Text          -- raw CF-Connecting-IP ("" only when no CF header, i.e. dev)
    country   Text          -- CF-IPCountry 2-letter code, free from cloudflare ("" if absent)
    lat       Double Maybe  -- CF-IPLatitude  (Nothing if header absent/unparseable)
    lng       Double Maybe  -- CF-IPLongitude
    deriving Show
|]

-- record one hit: append it to the event log, and that's all. the count is a
-- separate read now (countHits), so /hit is a pure write -- a single insert,
-- fire-and-forget. lat/lng are cloudflare's coarse coords (Nothing when absent),
-- already parsed by the caller from the request headers.
recordHit :: ConnectionPool -> Text -> Text -> Text -> Text -> Text -> Maybe Double -> Maybe Double -> IO ()
recordHit pool path referer userAgent ip country lat lng = do
    now <- getCurrentTime
    runSqlPool
        (insert_ (Hit now path referer userAgent ip country lat lng))
        pool

-- how many human hits a path has: just count its rows in the log. a pure read,
-- so with WAL it never blocks a writer. only called when a page opts in to
-- *display* its count (rare), so recomputing on demand is cheap -- at this scale
-- it's a sub-millisecond COUNT over a few thousand rows.
countHits :: ConnectionPool -> Text -> IO Int
countHits pool path = runSqlPool (count [HitPath ==. path]) pool

-- scotty hands back LAZY Text from headers; persistent wants STRICT Text.
-- this collapses "header absent" -> "" and converts in one step.
hdr :: Maybe TL.Text -> Text
hdr = maybe "" TL.toStrict

-- cloudflare's CF-IPLatitude/CF-IPLongitude arrive as lazy-Text headers like
-- "37.7749". parse to Maybe Double: header absent OR unparseable -> Nothing,
-- which is exactly why lat/lng are the schema's only Maybes. these headers exist
-- only once the "Add visitor location headers" managed transform is enabled.
parseCoord :: Maybe TL.Text -> Maybe Double
parseCoord mt = mt >>= readMaybe . TL.unpack

-- two endpoints, split by intent (command vs query):
--   POST /hit  record a hit (write). the beacon fires this on every page.
--   GET  /hit  read a path's count (read). a page opts in to display it.
-- both are CORS-open so catson.wiki's js can call them cross-origin, and both are
-- "simple requests" (no custom headers, no non-simple body) so the browser sends
-- them without a preflight -- which is why POST is free here, no OPTIONS needed.
hitRoutes :: ConnectionPool -> ScottyM ()
hitRoutes pool = do
    post "/hit" $ do
        setHeader "Access-Control-Allow-Origin" "*"
        -- path + the real inbound referer must come as explicit query params:
        -- the HTTP Referer header on a cross-origin fetch is catson's OWN
        -- origin, not where the visitor came from (verified empirically).
        mpath   <- queryParamMaybe "path" :: ActionM (Maybe Text)
        mref    <- queryParamMaybe "ref"  :: ActionM (Maybe Text)
        ua      <- header "User-Agent"
        -- we're behind cloudflared, so the socket is the tunnel. cloudflare
        -- injects the real visitor IP + a 2-letter country code as headers, and
        -- (with "Add visitor location headers" on) coarse lat/lng too.
        ip      <- header "CF-Connecting-IP"
        country <- header "CF-IPCountry"
        lat     <- header "CF-IPLatitude"
        lng     <- header "CF-IPLongitude"
        liftIO (recordHit pool (fromMaybe "" mpath) (fromMaybe "" mref)
                                (hdr ua) (hdr ip) (hdr country)
                                (parseCoord lat) (parseCoord lng))
        json $ object ["ok" .= True]

    get "/hit" $ do
        setHeader "Access-Control-Allow-Origin" "*"
        mpath <- queryParamMaybe "path" :: ActionM (Maybe Text)
        n     <- liftIO (countHits pool (fromMaybe "" mpath))
        json $ object ["count" .= n]
