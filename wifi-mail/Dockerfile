FROM node:14.5.0
WORKDIR /wifi-api
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]