FROM node:10

WORKDIR /react-project

COPY /react-project/public ./public
COPY /react-project/src ./src
COPY /react-project/package.json ./

RUN npm install

CMD ["npm", "start"]