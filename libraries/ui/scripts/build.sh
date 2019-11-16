#!/usr/bin/env bash

# Lint
geeks-log-eslint -c .eslintrc.js 'src/**/*.{js,jsx,ts,tsx}'

# Test
# jest --reporters="jest-standard-reporter"

# Build
rm -rf dist/
tsc -p tsconfig.json

rollup -c --silent

# Build demo
webpack
