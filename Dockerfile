FROM node:12.18.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV DATABASE_NAME='qa'
ENV CONNECTION_URL=mongodb://db:27017

EXPOSE 3000

CMD [ "node", "src/app.js"]