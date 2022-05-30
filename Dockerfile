FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
CMD node src/index.js
