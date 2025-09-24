FROM node:20-alpine AS base

WORKDIR /server

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . ./

CMD ["node", "index.js"]