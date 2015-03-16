#!/bin/bash

# This is an install script for Ubuntu, run as a user with sudo priveleges

# install nginx, vagrant, virtualbox and node.js
sudo apt-get update
sudo apt-get install -y nginx git curl python-software-properties python software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs vagrant virtualbox virtualbox-dkms

# update npm
npm update -g npm

# set up ottemo store and nginx
# TODO: add setup for vagrant and nginx
sudo mkdir -p /vagrant
cd /vagrant
npm install
npm install -g bower
bower install --allow-root
npm install -g gulp
gulp build
rm -f /etc/nginx/sites-enabled/default
cp -f ./config/store-ng.conf /etc/nginx/conf.d/
sed -i 's/\/opt\/store-ng/\/vagrant/g' /etc/nginx/conf.d/store-ng.conf
service nginx restart

