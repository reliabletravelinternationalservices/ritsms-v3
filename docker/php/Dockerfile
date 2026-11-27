
# ==========================================================
# Stage 1: Composer dependencies
# ==========================================================
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

# ==========================================================
# Stage 2: Frontend build (Vue + Vite + Inertia SSR)
# ==========================================================

FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Make Composer dependencies available to Vite
COPY --from=composer /app/vendor ./vendor

RUN npm run build:ssr


# ==========================================================
# Stage 3: PHP 8.4 application runtime
# ==========================================================
FROM php:8.4.27-fpm-alpine AS app

WORKDIR /var/www/html

# System dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    oniguruma-dev \
    linux-headers \
    libstdc++

# PHP extensions
RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        opcache \
        pcntl \
        pdo_mysql \
        sockets \
        zip

# Composer binary
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Laravel application
COPY . .


# Replace any Windows-created storage symlink
RUN rm -f public/storage \
    && ln -s ../storage/app/public public/storage
    
# Composer dependencies
COPY --from=composer /app/vendor ./vendor

# Compiled frontend assets
COPY --from=frontend /app/public/build ./public/build

# Inertia SSR assets
COPY --from=frontend /app/bootstrap/ssr ./bootstrap/ssr

# Node.js 22 runtime for Inertia SSR
COPY --from=frontend /usr/local/bin/node /usr/local/bin/node

# Frontend dependencies required by the SSR bundle
COPY --from=frontend /app/node_modules ./node_modules


# Production Laravel configuration
RUN mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chown -R www-data:www-data \
        storage \
        bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache


# PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]


# ==========================================================
# Stage 4: Nginx web server
# ==========================================================
FROM nginx:alpine AS nginx

WORKDIR /var/www/html

# Nginx configuration
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Public files and compiled frontend assets
COPY --from=app /var/www/html/public ./public

# Prepare the shared upload directory for Nginx
RUN rm -f /var/www/html/public/storage \
    && mkdir -p /var/www/html/public/storage