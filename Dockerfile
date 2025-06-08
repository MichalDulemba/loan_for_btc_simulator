# Multi-stage build for React/Vite app
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create simple nginx config
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 8080;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name _;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Copy simple entrypoint for Cloud Run support
COPY simple-entrypoint.sh /simple-entrypoint.sh
RUN chmod +x /simple-entrypoint.sh

# Expose port
EXPOSE 8080

# Use simple entrypoint
ENTRYPOINT ["/simple-entrypoint.sh"] 