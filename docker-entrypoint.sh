#!/bin/sh

# Set default port if not provided
PORT=${PORT:-8080}

# Debug: Check if files exist
echo "Checking if built files exist:"
ls -la /usr/share/nginx/html/

# Generate nginx config with dynamic port
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen ${PORT};
    server_name _;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
        
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Debug: Show the generated config
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf

# Test nginx config
nginx -t

# Start nginx
exec nginx -g 'daemon off;' 