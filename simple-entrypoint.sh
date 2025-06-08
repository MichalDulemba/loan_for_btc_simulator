#!/bin/sh

# Set default port if not provided (for local testing)
PORT=${PORT:-8080}

# Replace port in nginx config and start nginx
sed -i "s/8080/${PORT}/g" /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;' 