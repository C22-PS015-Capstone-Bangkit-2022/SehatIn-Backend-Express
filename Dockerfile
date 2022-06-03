FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
CMD NODE_ENV=gcloud node src/index.js
