FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5003

CMD ["npm", "run", "start"]