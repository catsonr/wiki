{-# LANGUAGE OverloadedStrings #-}

-- composition root: read config, build the pool, run migrations, mount routes.
-- all the feature logic (schema + handlers) now lives in its own module.
module Main where

import Web.Scotty
import Database.Persist.Sqlite (createSqlitePool, runSqlPool, runMigration)
import Control.Monad.Logger (runStderrLoggingT)
import Data.Text (Text, pack)
import System.Environment (lookupEnv)

import Hits (migrateHits, hitRoutes)
-- import Logs (migrateLogs, logRoutes)  -- carson's building this one

main :: IO ()
main = do
    -- db path is configurable so prod can point at a mounted volume;
    -- falls back to ./cwab.db for local dev.
    dbPath <- maybe "cwab.db" pack <$> lookupEnv "CWAB_DB" :: IO Text
    pool <- runStderrLoggingT $ createSqlitePool dbPath 10

    -- each feature module owns its own migration; run them all on boot.
    runSqlPool (runMigration migrateHits) pool
    -- runSqlPool (runMigration migrateLogs) pool

    scotty 3000 $ do
        get "/" $
            text "cwab is alive"

        hitRoutes pool
