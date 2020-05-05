FROM node:10-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm install

CMD [ "npm", "run", "start" ]
