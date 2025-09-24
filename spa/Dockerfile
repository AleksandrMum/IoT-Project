FROM node:20-alpine

WORKDIR /spa

COPY package.json package-lock.json ./
RUN npm ci

# Копируем public файлы
COPY public ./public

# Копируем исходники приложения
COPY src ./src

CMD ["npm", "start"]