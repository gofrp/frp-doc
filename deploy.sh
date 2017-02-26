#!/bin/bash

body='{
"request": {
    "message": "Update docs (triggered by fatedier/frp-doc).",
    "branch":"master"
  }
}'

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token ${ACCESS_TOKEN}" \
  -d "$body" \
  https://api.travis-ci.org/repo/fatedier%2Ffrp-site/requests
