# Builder
FROM node:10-alpine as builder

WORKDIR /build

COPY . .
RUN npm install && npm run build

# Runtime container
FROM node:10-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY --from=builder /build/dist ./dist

CMD [ "npm", "run", "start" ]
