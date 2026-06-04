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

-- the "hits" feature: a page-hit counter.
-- this module owns everything hits-related: its schema, its migration,
-- and its routes. Main just mounts what we export here.
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

-- the typed schema for this feature. mkMigrate emits 'migrateHits', which
-- Main runs on boot to bring the sqlite table in line with these types.
share [mkPersist sqlSettings, mkMigrate "migrateHits"] [persistLowerCase|
Hit
    time UTCTime
    lat  Double Maybe
    lng  Double Maybe
    deriving Show
|]

-- record one hit (no geo yet) and hand back the running total.
-- split out from the route so it's reusable + testable without scotty.
recordHit :: ConnectionPool -> IO Int
recordHit pool = do
    now <- getCurrentTime
    runSqlPool
        (do _ <- insert (Hit now Nothing Nothing)
            count ([] :: [Filter Hit]))
        pool

-- mount the /hit endpoint.
-- the Allow-Origin header lets catson.wiki's js read this cross-origin.
hitRoutes :: ConnectionPool -> ScottyM ()
hitRoutes pool =
    get "/hit" $ do
        setHeader "Access-Control-Allow-Origin" "*"
        total <- liftIO (recordHit pool)
        json $ object ["count" .= total]
