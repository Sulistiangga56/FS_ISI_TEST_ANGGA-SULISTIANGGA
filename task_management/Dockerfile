# task_management/Dockerfile
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    curl \
    git \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www

# Copy existing application
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install

# Permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www
