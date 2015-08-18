#!/bin/bash

# SRCDIR
SRCDIR=/home/ottemo/storefront
MEDIADIR=/home/ottemo/media

if [ "$BRANCH" == 'develop' ]; then
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune && git pull"
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && rm -rf media && npm install -g gulp&& npm install"
    # build locally after successful merge to develop
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && NODE_ENV=production gulp build && cd dist && ln -s $MEDIADIR media"
    # restart nginx
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && sudo /etc/init.d/nginx restart"
fi
