FROM php:8.2-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY webserver/ /var/www/html/

RUN set -eux; \
	mkdir -p /var/www/html/share_pictures; \
	chown -R www-data:www-data /var/www/html; \
	chmod -R u=rwX,g=rX,o=rX /var/www/html; \
	chmod 2775 /var/www/html/share_pictures
