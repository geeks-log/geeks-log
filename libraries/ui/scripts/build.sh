#!/usr/bin/env bash

# Build
rm -rf dist/
rm -rf esm/

tsc -p tsconfig.build.json
tsc -p tsconfig.esm.json

rollup -c --silent

# Build demo
webpack
