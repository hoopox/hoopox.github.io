#!/bin/bash

if [[ -n $(git diff --stat)  ]]
then
  git diff --stat
  git add .
  git commit -m 'update website'
  git push -f "https://${access_token}@github.com/hoopox/hoopox.github.io.git" master
fi
