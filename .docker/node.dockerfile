FROM node:alpine3.11 AS builder

WORKDIR /usr/src

RUN npm i -g nodemon typescript ts-node

COPY package.json ./package.json
RUN npm install

COPY . .

CMD ["nodemon"]
