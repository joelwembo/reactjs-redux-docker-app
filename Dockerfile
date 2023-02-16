FROM node:16.16-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# For reverse proxy settings
# COPY default.conf /etc/nginx/conf.d/default.conf
COPY . .

RUN npm run build

FROM nginx:alpine AS prod2

WORKDIR /usr/share/nginx/html
COPY --from=prod /app/build .
EXPOSE 3000
EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
