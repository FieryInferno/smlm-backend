#!/bin/bash
DIR="/home/ubuntu/be-calendar"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi