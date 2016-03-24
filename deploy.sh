#!/bin/bash

# SRCDIR
HOME=/home/ottemo
SRCDIR=$HOME/code/ultimo
MEDIADIR=$HOME/media

if [ "$BRANCH" == 'develop' ]; then
    echo ""
    echo UPDATING REMOTE GIT REPOSITORY WITH DEVELOP BRANCH.
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && git checkout develop && git fetch --prune && git pull"

    echo ""
    echo REMOVING DIST DIRECTORY.
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && rm -rf dist"

    echo ""
    echo RUNNING PRODUCTION GULP BUILD AND RESTORING SYMLINK TO MEDIA FOLDER.
    ssh ottemo@$REMOTE_HOST "cd $SRCDIR && npm install && gulp build --env=staging --config=staging"

    echo ""
    echo RESTORING DIST DIRECTORY.
    ssh ottemo@$REMOTE_HOST "rm -rf $HOME/store/* && cp -R $SRCDIR/dist/* $HOME/store && ln -s $MEDIADIR $HOME/store/media"

    echo ""
    echo DEPLOY FINISHED
fi
