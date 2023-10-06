FROM node:18.16.0

WORKDIR /services/app

ENV PORT=4002

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ./ ./

EXPOSE 4002

CMD [ "npx", "nodemon", "app.js" ]