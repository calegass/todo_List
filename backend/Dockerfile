FROM node:10

WORKDIR /app

COPY ./src ./src
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "src/app.js"]