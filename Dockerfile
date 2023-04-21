FROM node:current-alpine3.17
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
