#!/usr/bin/env bash

FIREBASE_TOKEN=$FIREBASE_TOKEN

firebase deploy --only hosting --token "$FIREBASE_TOKEN"
