FROM node:20-alpine as build
ARG VITE_APP_URL
ARG VITE_BACKEND_HOST
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
ENV VITE_BACKEND_HOST=${VITE_BACKEND_HOST}
ENV VITE_APP_URL=${VITE_APP_URL}
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/frontend/dist .
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
