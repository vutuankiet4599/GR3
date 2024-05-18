FROM node:20-alpine
ENV NODE_ENV production
WORKDIR /app/live-server
COPY . .
RUN npm ci --only=production
RUN npm install pm2 -g
# CMD pm2 start process.yml && tail -f /dev/null
CMD ["pm2-runtime", "start", "process.yml"]
EXPOSE 3000