#!/bin/bash

# SRCDIR
SRCDIR=/home/ottemo/storefront
MEDIADIR=/home/ottemo/media

if [ "$BRANCH" == 'develop' ]; then
		echo "Updating remote git reposistory with develop branch."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune && git pull"
    echo "Removing symlink to media folder and installing gulp and npm."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && rm -rf media && npm install -g gulp && npm install"
    # build locally after successful merge to develop
    echo "Running gulp build and restoring symlink to media folder."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && NODE_ENV=production gulp build && cd dist && ln -s $MEDIADIR media"
    # restart nginx
    echo "Restarting nginx."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && sudo /etc/init.d/nginx restart"
fi
