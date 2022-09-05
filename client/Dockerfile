#-------------- Stage 1 (build) --------------#
# Using Node.js, build and compile the frontend

FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build


#-------------- Stage 2 (serve) --------------#
# Using Nginx, serve the compiled frontend app

FROM nginx:1.23-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build /app/build
