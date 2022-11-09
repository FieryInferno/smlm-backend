#!/bin/bash
DIR="/home/ubuntu/smlm-backend"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi