FROM node:12 as base
WORKDIR /wifi-stream
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6853
ENTRYPOINT  npm run start