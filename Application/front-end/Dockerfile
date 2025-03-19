FROM node:22-alpine

COPY . /Application/front-end
WORKDIR /Application/front-end

RUN yarn install --save-optional
RUN yarn run build

#RUN adduser -h . --disabled-password frontend-user
#USER frontend-user
