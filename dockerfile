FROM node:12.14.1-alpine AS build
ARG APPS=app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm config set strict-ssl false  && npm install
#RUN npm install
COPY ./ /usr/src/app
RUN npm run build --prod
RUN mv /usr/src/app/dist/${APPS}/* /usr/src/app/dist/

FROM nginx:1.13.8-alpine
EXPOSE 80
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
