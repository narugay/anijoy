FROM node:18

ENV NODE_ENV=production

WORKDIR /app/

COPY . .

RUN npm install --prefix client
RUN npm install
RUN npm run build --prefix client

CMD ["nodemon", "index.js"]
