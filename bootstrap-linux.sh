apt-get update
apt-get install -y nginx git curl python-software-properties python software-properties-common
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
npm update -g npm
cd /vagrant
npm install
npm install -g bower
bower install --allow-root
npm install -g gulp
gulp build
rm -f /etc/nginx/sites-enabled/default
cp -f ./config/storefront.conf /etc/nginx/conf.d/
sed -i 's/\/opt\/storefront/\/vagrant/g' /etc/nginx/conf.d/storefront.conf
service nginx restart

