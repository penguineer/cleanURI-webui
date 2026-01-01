# build environment
FROM --platform=linux/amd64 node:25.2-alpine AS build_amd64

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm --no-audit --no-fund ci

COPY . ./

RUN npm run build


# This is here to satisfy
# https://docs.docker.com/reference/build-checks/from-platform-flag-const-disallowed/
FROM build_amd64 AS build


# production environment
FROM nginx:1.29.4-alpine
RUN apk add --no-cache jq

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
ENV INDEX=/usr/share/nginx/html/index.html

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
