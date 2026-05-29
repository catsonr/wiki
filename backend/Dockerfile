# ---- build stage: full haskell toolchain, thrown away after ----
FROM haskell:9.6.7 AS build
WORKDIR /app

# copy only the cabal file first so the (slow) dependency build is layer-cached
# and only re-runs when cwab.cabal changes
COPY cwab.cabal ./
RUN cabal update && cabal build --only-dependencies

# now build cwab itself and stash the binary at a known path
COPY src ./src
RUN cabal build exe:cwab && \
    mkdir -p /app/bin && \
    cp "$(cabal list-bin exe:cwab)" /app/bin/cwab

# ---- runtime stage: slim, just the binary + its shared libs ----
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgmp10 zlib1g libffi8 ca-certificates && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/bin/cwab /app/cwab

# prod writes the db to a mounted volume
ENV CWAB_DB=/data/cwab.db
EXPOSE 3000
CMD ["/app/cwab"]
