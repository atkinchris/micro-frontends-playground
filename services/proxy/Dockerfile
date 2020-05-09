FROM node:12-alpine as builder

WORKDIR /build

COPY . ./
RUN npm install
RUN npm run build

# Main container
FROM node:12-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
COPY --from=builder /build/dist ./dist
RUN npm install

CMD [ "npm", "run", "start" ]
