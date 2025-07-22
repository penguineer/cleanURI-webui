# build environment
FROM node:24.4.1-alpine3.21 AS build

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm --no-audit --no-fund ci

COPY . ./

RUN npm run build


# production environment
FROM nginx:1.29.0-alpine
RUN apk add --no-cache jq

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
ENV INDEX=/usr/share/nginx/html/index.html

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
