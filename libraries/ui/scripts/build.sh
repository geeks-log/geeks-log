#!/usr/bin/env bash

# Lint
geeks-log-eslint -c .eslintrc.js 'src/**/*.{js,jsx,ts,tsx}'

# Test
# jest --reporters="jest-standard-reporter"

# Build
rm -rf dist/
rm -rf esm/

tsc -p tsconfig.build.json
tsc -p tsconfig.esm.json

rollup -c --silent

# Build demo
webpack
