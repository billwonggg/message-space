# Base image
FROM node:18-alpine

WORKDIR /app

# Copy package json and install dependencies
COPY package*.json ./

RUN npm install

# Copy our app
COPY . .

# Command to run our app
CMD npm start