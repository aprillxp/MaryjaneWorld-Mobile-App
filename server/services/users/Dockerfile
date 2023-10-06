FROM node:18.16.0

WORKDIR /services/users

ENV PORT=4001

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ./ ./

EXPOSE 4001

CMD [ "npx", "nodemon", "app.js" ]