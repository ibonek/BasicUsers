FROM python:3.8.10-alpine

RUN addgroup -S app && adduser -S app -G app -u 1000

RUN apk update \
    && apk add gcc g++ musl-dev python3-dev mariadb-dev

WORKDIR /api
COPY * /api/


RUN pip3 install --upgrade pip \
    && pip3 install -r requirements.txt

EXPOSE 5000
CMD gunicorn --bind 0.0.0.0:5000 app:app