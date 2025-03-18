# build environment
FROM node:22.14.0-alpine3.21 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm --no-audit --no-fund ci

COPY . ./

RUN npm run build


# production environment
FROM nginx:1.27.4-alpine
RUN apk add --no-cache jq

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
ENV INDEX /usr/share/nginx/html/index.html

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
