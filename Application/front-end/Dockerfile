FROM node:22-alpine

COPY package.json package.json
RUN yarn
RUN yarn global add vite

COPY . /Application/front-end
WORKDIR /Application/front-end

RUN yarn run build

#RUN adduser -h . --disabled-password frontend-user
#USER frontend-user
