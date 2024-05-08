FROM node:20-alpine
WORKDIR /app/frontend
COPY package.json .
COPY . .
RUN npm install

CMD npm run build