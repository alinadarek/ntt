FROM node:25-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 8080
CMD ["node", "app.js"]
