FROM node:12 as base
WORKDIR .
COPY package*.json ./
RUN npm install

WORKDIR /wifi-api
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 6533
ENTRYPOINT  npm run start