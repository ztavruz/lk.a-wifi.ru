# этап сборки (build stage)
FROM node:lts-alpine as build-stage
#RUN mkdir -p /wifi-client
WORKDIR /wifi-client
COPY package*.json ./
RUN npm install
COPY . /wifi-client
RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /wifi-client/dist /usr/share/nginx/html

#RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

