#!/bin/bash

# SRCDIR
SRCDIR=/home/ottemo/storefront
MEDIADIR=/home/ottemo/media

if [ "$BRANCH" == 'develop' ]; then
		echo "\nUpdating remote git reposistory with develop branch."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune && git pull"
    echo "\nRemoving symlink to media folder and installing gulp and npm."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && rm -rf media && npm install -g gulp && npm install"
    # build locally after successful merge to develop
    echo "\nRunning gulp build and restoring symlink to media folder."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && NODE_ENV=production gulp build && cd dist && ln -s $MEDIADIR media"
    # restart nginx
    echo "\nRestarting nginx."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && sudo /etc/init.d/nginx restart"
  elif [[ "$BRANCH" != "develop" ]]; then
		echo "\nUpdating remote git reposistory with ${BRANCH} branch."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune && git checkout -f ${BRANCH} && git pull -u origin ${BRANCH}"
    echo "\nRemoving symlink to media folder and installing gulp and npm."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && rm -rf media && npm install -g gulp && npm install"
    # build locally after successful merge to develop
    echo "\nRunning gulp build and restoring symlink to media folder."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && gulp build && cd dist && ln -s $MEDIADIR media"
    # restore develop branch on dev server
    echo "\nRestoring git repository on dev server."
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git checkout -f develop"
fi
