FROM php:8.2-fpm as build
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-dev
COPY . .
RUN composer dump-autoload --optimize
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /var/www/html .
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
