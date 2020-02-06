FROM node:13.7.0-stretch-slim
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run test
RUN npm run lint
EXPOSE 3000
CMD [ "npm", "start" ]