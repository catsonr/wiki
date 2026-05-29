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

module Main where

import Web.Scotty
-- persistent's query fns 'get' and 'delete' collide with scotty's HTTP verbs,
-- so we hide them here. we don't need them in this file (yet).
import Database.Persist.Sqlite hiding (get, delete)
import Database.Persist.TH
import Control.Monad.Logger (runStderrLoggingT)
import Data.Aeson (object, (.=))
import Data.Text (Text, pack)
import Data.Time (UTCTime, getCurrentTime)
import System.Environment (lookupEnv)

-- the typed schema. each new feature gets its own entity in this block.
-- changing a field here = persistent handles the migration on next boot.
share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Hit
    time UTCTime
    lat  Double Maybe
    lng  Double Maybe
    deriving Show
|]

main :: IO ()
main = do
    -- db path is configurable so prod can point at a mounted volume;
    -- falls back to ./cwab.db for local dev.
    dbPath <- maybe "cwab.db" pack <$> lookupEnv "CWAB_DB" :: IO Text
    pool <- runStderrLoggingT $ createSqlitePool dbPath 10
    runSqlPool (runMigration migrateAll) pool

    scotty 3000 $ do
        get "/" $
            text "cwab is alive"

        -- log a hit, return the running total.
        -- the Allow-Origin header lets catson.wiki's js read this cross-origin.
        get "/hit" $ do
            setHeader "Access-Control-Allow-Origin" "*"
            now <- liftIO getCurrentTime
            total <- liftIO $ runSqlPool
                (do _ <- insert (Hit now Nothing Nothing)
                    count ([] :: [Filter Hit]))
                pool
            json $ object ["count" .= total]
