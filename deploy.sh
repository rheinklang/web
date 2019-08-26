#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/rheinklang_deployment_rsa # Allow read access to the private key
ssh-add .travis/rheinklang_deployment_rsa # Add the private key to SSH

git config --global push.default matching
git remote add deploy ssh://git@$HOST:$PORT$DEPLOY_DIR
git push deploy master
