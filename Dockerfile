# build environment
FROM node:18.6.0-alpine3.15 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm install react-scripts@5.0.1 -g

COPY . ./

RUN npm run build


# production environment
FROM nginx:1.23.1-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
