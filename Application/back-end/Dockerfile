FROM python:3.10-alpine3.16

COPY requirements.txt /temp/requirements.txt
COPY . /Application/back-end

WORKDIR /Application/back-end

RUN pip install -r /temp/requirements.txt

RUN adduser --disabled-password application-user

USER application-user