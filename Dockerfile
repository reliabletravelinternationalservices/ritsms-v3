
# --------------------------------------------------
# Stage 1: PHP base with required extensions
# --------------------------------------------------
FROM php:8.3-apache-bookworm AS php-base

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libzip-dev libicu-dev libpng-dev \
    libjpeg62-turbo-dev libfreetype6-dev \
    libonig-dev libxml2-dev $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
       pdo_mysql mbstring bcmath exif pcntl intl zip gd \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && a2enmod rewrite headers \
    && apt-get purge -y --auto-remove $PHPIZE_DEPS \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/pear

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"


# --------------------------------------------------
# Stage 2: Install Composer dependencies
# --------------------------------------------------
FROM php-base AS vendor

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


# --------------------------------------------------
# Stage 3: Build Vue + Inertia + Vite
# --------------------------------------------------
FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Ziggy is installed by Composer, not npm
COPY --from=vendor \
    /var/www/html/vendor/tightenco/ziggy \
    ./vendor/tightenco/ziggy

RUN npm run build


# --------------------------------------------------
# Stage 4: Final production application
# --------------------------------------------------
FROM php-base AS app

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

COPY . .

# Reuse dependencies installed in Stage 2
COPY --from=vendor /var/www/html/vendor ./vendor

# Copy compiled Vite assets
COPY --from=frontend /app/public/build ./public/build

# Generate optimized autoload files and discover packages
RUN composer dump-autoload \
        --no-dev \
        --optimize \
        --no-scripts \
    && php artisan package:discover --ansi

# Configure Apache to serve Laravel's public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri \
    's!/var/www/html!/var/www/html/public!g' \
    /etc/apache2/sites-available/*.conf \
    && printf '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n' \
    > /etc/apache2/conf-available/laravel-public.conf \
    && a2enconf laravel-public \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]
