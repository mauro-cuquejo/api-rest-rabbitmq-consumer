FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && npm i express && npm i morgan && npm i dotenv

ENV NODE_ENV=production

COPY . .

CMD ["npm", "start"]