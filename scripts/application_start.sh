#!/bin/bash
sudo chmod -R 777 /home/ubuntu/smlm-backend
cd /home/ubuntu/smlm-backend
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
npm install
node index.js
