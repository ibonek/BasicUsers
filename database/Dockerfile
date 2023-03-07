FROM mariadb:latest

RUN apt-get update && \
    apt-get install locales

# Locale
RUN sed -i '/es_ES.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:en
ENV LC_ALL es_ES.UTF-8

CMD ["mysqld"]

EXPOSE 3306
