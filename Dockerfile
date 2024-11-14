FROM python:3.10-alpine3.16

COPY requirements.txt /temp/requirements.txt
COPY Application /Application

WORKDIR /Application/back-end
EXPOSE 8000

RUN pip install -r /temp/requirements.txt

RUN adduser --disabled-password application-user

USER application-user