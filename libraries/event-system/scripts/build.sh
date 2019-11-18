#!/usr/bin/env bash

# Lint
geeks-log-eslint -c .eslintrc.js '{src,test}/**/*.{js,jsx,ts,tsx}'

# Test
jest --reporters="jest-standard-reporter"

# Build
rm -rf dist/
rm -rf esm/

tsc -p tsconfig.json
tsc -p tsconfig.esm.json
