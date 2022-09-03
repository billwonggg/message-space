# Base image
FROM node

WORKDIR /app

# Copy package json and install dependencies
COPY package*.json ./
RUN npm install

# Copy our app
COPY . .

# Expose port to access server
EXPOSE 3001

# Command to run our app
CMD npm start