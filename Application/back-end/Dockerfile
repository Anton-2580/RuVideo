FROM python:3.10-alpine3.16

RUN apk add ffmpeg
RUN apk add postgresql-client build-base postgresql-dev

COPY requirements.txt /temp/requirements.txt
RUN pip install -r /temp/requirements.txt

COPY . /Application/back-end
WORKDIR /Application/back-end

#RUN adduser -h . --disabled-password backend-user
#USER backend-user