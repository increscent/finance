#/bin/sh

# Requires root privileges

cd /home/robert/finance

npm install
npm run build

cp ./setup/finance_service /usr/local/etc/rc.d/finance

printf '\nfinance_enable="YES"\n' >> /etc/rc.conf

mkdir -p /usr/local/etc/nginx/sites-enabled

cp ./setup/finance_nginx /usr/local/etc/nginx/sites-enabled/finance
