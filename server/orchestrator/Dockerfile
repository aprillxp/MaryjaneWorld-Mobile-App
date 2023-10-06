FROM node:18.16.0

WORKDIR /orchestrator

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ././

EXPOSE 4000

CMD ['npx', 'nodemon', 'app.js']