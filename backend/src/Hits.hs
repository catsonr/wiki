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
-- a Hit is one page request from a js-capable client. for now only
-- catson-sanctuary's index.html fires it; the plan is every page, so we can
-- later reconstruct each visitor's path through the site keyed on `ip`.
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

-- the typed schema for this feature. mkMigrate emits 'migrateHits', which
-- Main runs on boot to bring the sqlite table in line with these types.
--
-- nullability is deliberate, not lazy: the text fields are non-null because a
-- string always has a meaningful empty value ("" = "direct"/"none"), while
-- lat/lng are the only Maybes because a Double has no honest empty (0,0 is a
-- real place in the gulf of guinea), so a missed geoip lookup must be Nothing.
share [mkPersist sqlSettings, mkMigrate "migrateHits"] [persistLowerCase|
Hit
    time      UTCTime
    path      Text          -- location.pathname  (which page fired it)
    referer   Text          -- document.referrer  ("" = direct / suppressed)
    userAgent Text          -- the User-Agent header
    ip        Text          -- raw CF-Connecting-IP ("" only when no CF header, i.e. dev)
    country   Text          -- CF-IPCountry 2-letter code, free from cloudflare ("" if absent)
    lat       Double Maybe  -- geoip (phase 2; Nothing for now)
    lng       Double Maybe
    deriving Show
|]

-- record one hit and hand back the running total.
-- split out from the route so it's reusable + testable without scotty.
-- takes the already-extracted, strict-Text fields; lat/lng (fine geo) is phase 2.
recordHit :: ConnectionPool -> Text -> Text -> Text -> Text -> Text -> IO Int
recordHit pool path referer userAgent ip country = do
    now <- getCurrentTime
    runSqlPool
        (do _ <- insert (Hit now path referer userAgent ip country Nothing Nothing)
            count ([] :: [Filter Hit]))
        pool

-- scotty hands back LAZY Text from headers; persistent wants STRICT Text.
-- this collapses "header absent" -> "" and converts in one step.
hdr :: Maybe TL.Text -> Text
hdr = maybe "" TL.toStrict

-- mount the /hit endpoint.
-- the Allow-Origin header lets catson.wiki's js read this cross-origin.
hitRoutes :: ConnectionPool -> ScottyM ()
hitRoutes pool =
    get "/hit" $ do
        setHeader "Access-Control-Allow-Origin" "*"
        -- path + the real inbound referer must come as explicit query params:
        -- the HTTP Referer header on a cross-origin fetch is catson's OWN
        -- origin, not where the visitor came from (verified empirically).
        mpath   <- queryParamMaybe "path" :: ActionM (Maybe Text)
        mref    <- queryParamMaybe "ref"  :: ActionM (Maybe Text)
        ua      <- header "User-Agent"
        -- we're behind cloudflared, so the socket is the tunnel. cloudflare
        -- injects the real visitor IP and a 2-letter country code as headers.
        ip      <- header "CF-Connecting-IP"
        country <- header "CF-IPCountry"
        let path' = fromMaybe "" mpath
            ref'  = fromMaybe "" mref
        total <- liftIO (recordHit pool path' ref' (hdr ua) (hdr ip) (hdr country))
        json $ object ["count" .= total]
