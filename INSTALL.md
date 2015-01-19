## Developer Installation Instructions

### Install NPM Gulp and Bower

#### OSX
    brew install nvm
    nvm install v0.10.31
    nvm alias default v0.10.31
    brew install git-flow
    npm install -g gulp bower

#### Debian based Linux
    sudo apt-get update
    sudo apt-get install -y python-software-properties python g++ make
    sudo add-apt-repository -y ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

    sudo apt-get install git-flow

    npm install -g bower gulp

### Install Local Project Dependencies
    cd <directory of your cloned repository>
    npm install
    bower install

## Prerequisites

Before you begin with this guide, there are a few steps that need to be completed first.

Due to the demands of processing Ottemo operations, it is recommended that you install Ottemo on a VPS with at least 1 GB of RAM. This will ensure that all of the software involved in managing the store will have enough memory to work.

Ottemo supports three different deployment options: *Standalone (with Nginx), Docker (Linux Containers), or *Vagrant (Virtual Boxes)*

## Standalone Installation (Self Host)

### Step 1 - Prepare Host

#### Create ottemo user
```
adduser ottemo
```

Give sudo privileges.

```
visudo
```

#### Create directories

Change to ottemo user: ```su ottemo```

```
cd;
mkdir dash
mkdir store-ng
mkdir foundation
```

#### Install Nginx
```
sudo apt-get update && sudo apt-get install nginx
```

#### Configure Nginx

Before we download and install Ottemo, nginx will need to be configured to properly handle Ottemo's traffic and computing tasks, and some additional modules will need to be activated.

#### Nginx Server Block

This is a sample of an nginx configuration file you may use to host Ottemo.
You may run ```sudo service nginx configtest``` to confirm that the copy worked before restarting the nginx service with ```sudo service nginx restart```.

To create this file run ```sudo vim /etc/nginx/sites-available/ottemo```

Copy this into the file opened with Vim (replace PATH-TO with your path and $IPADDRESS with the IP Address of your host):

```
server {
    listen 8080;

    root /PATH-TO/store-ng/dist/;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;

    root /PATH-TO/store-ng/dist/;
    index index.html;

    server_name admin.$HOSTNAME;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;

    server_name api.$HOSTNAME;

    location / {
         proxy_pass http://127.0.0.1:3000;
    }
}

server {
	listen 80 default_server;
	listen [::]:80 default_server ipv6only=on;

 	root /home/ottemo/store-ng/dist;
	index index.html index.htm;

	# Make site accessible from http://localhost/
	server_name localhost;

        location /foundation {
            proxy_pass http://127.0.0.1:3000;
        }
	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

}
```

Alternatively, you may run ```wget http://ottemo.io/downloads/assets/nginx.conf``` and then move it with ```sudo mv nginx.conf /etc/nginx/sites-available/ottemo```.

To enable the configuration you will need to symlink it to sites-available with and remove the default file so it uses our configuration:
```
cd /etc/nginx/sites-enabled/
sudo ln -sf ../sites-available/ottemo .
sudo rm default ../sites-available/default
```
#### DNS Records

You will need to create three A records in your DNS records for your domain name.
```
www            A    $IPADDRESS
admin.         A    $IPADDRESS
api.           A    $IPADDRESS
```

### Step 2 - Download and Build Ottemo

#### Download Ottemo

We are now ready to download and install Ottemo. To see what the latest stable version of the Ottemo Developer Edition is, head over to the community download page. In this example, the current release number was 0.1.0, but you should substitute that number for the latest release available to you. It is always recommended to use the latest version of Ottemo, as new releases often include important security updates in addition to new and improved features.

Visit the [Downloads](http://ottemo.io/downloads.html) page and download the tarballs for the Ottemo stack: OttemoStore-ng-0.x.x.gz, OttemoDashboard-0.x.x.gz, OttemoFoundation-0.x.x.gz

You may use ```wget``` to download the tarballs.
```
cd ~
wget http://www.ottemo.io/downloads/assets/0.1.0/OttemoStore-ng-0.1.0.tar.gz
wget http://www.ottemo.io/downloads/assets/0.1.0/OttemoDashboard-0.1.0.tar.gz
wget http://www.ottemo.io/downloads/assets/0.1.0/OttemoFoundation-0.1.0.tar.gz
```

We can extract the archived files into the directories we created earlier and rebuild the Ottemo directories with tar:
```
tar -xvzf OttemoStore-ng-0.1.0.tar.gz store-ng
tar -xvzf OttemoDashboard-0.1.0.tar.gz dashboard
tar -xvzf OttemoFoundation-0.1.0.tar.gz foundation
```

If you would like to compile the latest build of OttemoStore-ng and OttemoDashboard from source, please follow [these instructions](http://ottemo.io/howto/install.html#LINK).

#### Build
##### Build Ottemo Store-ng
We must first build the store-ng and dashboard.
Change directory to store-ng: ```cd store-ng```

Use npm to install necessary node modules. Gulp and bower must be installed globally:
```
npm install
npm install -g gulp bower
```

Install bower components: ```bower install```

Use gulp to compile the Angular store-ng for Ottemo:
```
gulp build FOUNDATION_URI=http://localhost:3000 THEME_AS_DEFAULT=default DEFAULT_ROOT=admin DEFAULT_PASS=admin
```
You may set the defaultRoot and defaultPass to your own preference.

##### Build Ottemo Dashboard
Change directory to dashboard: ```cd ~/dashboard```

Use npm to install necessary node modules. Gulp and bower must be installed globally:
```
npm install
npm install -g gulp bower
```

Install bower components: ```bower install```

Use gulp to compile the Angular dashboard for Ottemo:```gulp build```

These builds will create a directory named "dist" within 'store-ng' and 'dashboard'.

#### Configure Foundation
```
cd ~/foundation
```

#### Install

To install Ottemo we must create the init script:
```
sudo vim /etc/init.d/ottemo
```

Copy the following into the file opened with Vim:
```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          <NAME>
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       <DEEXECION>
### END INIT INFO

NAME=ottemo
HOME=/home/ottemo/foundation

EXEC=$HOME/foundation
RUNAS=ottemo

PIDFILE=$HOME/$NAME.pid
LOGFILE=$HOME/$NAME.log

start() {
  if [ -f "$PIDFILE" ] && sudo kill -0 $(cat "$PIDFILE"); then
    echo "Service $NAME already running" >&2
    return 1
  fi
  echo "Starting service $NAME" >&2
  local CMD="cd $HOME; $EXEC &> \"$LOGFILE\" & echo \$! > $PIDFILE"
  sudo su -l -c "$CMD" $RUNAS
  echo "Service $NAME started" >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! sudo kill -0 $(cat "$PIDFILE"); then
    echo "Service $NAME not running" >&2
    return 1
  fi
  echo "Stopping service $NAME" >&2
  sudo kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo "Service $NAME stopped" >&2
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
esac
```

#### Starting Ottemo

You may now use the ```service``` command to start the Ottemo stack.
```
sudo service ottemo start
```

You may now browse to the IP address of your host in your browser to view Ottemo running on your host:
```http://$HOSTNAME``` for Ottemo Store-ng
```http://admin.$HOSTNAME``` for Ottemo Dash
```http://api.$HOSTNAME``` for Ottemo Foundation (API Server)
