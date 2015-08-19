#!/bin/bash

# SRCDIR
SRCDIR=/home/ottemo/storefront
MEDIADIR=/home/ottemo/media

if [ "$BRANCH" == 'develop' ]; then
		echo ""
		echo "UPDATING REMOTE GIT REPOSITORY WITH DEVELOP BRANCH."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune && git pull"
    echo ""
    echo "REMOVING DIST DIRECTORY."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && rm -rf dist"
    echo ""
    echo "INSTALL GULP AND RUN NPM INSTALL"
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && npm install -g gulp && npm install"
    # build locally after successful merge to develop
    echo ""
    echo "RUNNING PRODUCTION GULP BUILD AND RESTORING SYMLINK TO MEDIA FOLDER."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && NODE_ENV=production gulp build"
    echo ""
    echo "RESTORING DIST DIRECTORY."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && ln -s $MEDIADIR media"
    # restart nginx
    echo ""
    echo "RESTARTING NGINX."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && sudo /etc/init.d/nginx restart"
  elif [[ "$BRANCH" != "develop" ]]; then
  	echo ""
		echo "UPDATING REMOTE GIT REPOSISTORY WITH ${BRANCH} BRANCH."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git checkout -f develop && git branch -D ${BRANCH}"
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git fetch --prune"
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git checkout -b ${BRANCH} origin/${BRANCH}"
    echo ""
    echo "REMOVING SYMLINK TO MEDIA FOLDER."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR/dist && rm -rf media"
    echo ""
    echo "INSTALL GULP AND RUN NPM INSTALL"
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && npm install -g gulp && npm install"
    # build locally after successful merge to develop
    echo ""
    echo "RUNNING GULP BUILD AND RESTORING SYMLINK TO MEDIA FOLDER."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && gulp build && cd dist && ln -s $MEDIADIR media"
    # restore develop branch on dev server
    echo ""
    echo "RESTORING GIT REPOSITORY ON DEV SERVER."
    echo ""
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git checkout -f develop"
fi
