FROM node:14.15.1 AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build

FROM nginx:1.19-alpine
COPY ./nginx.config /etc/nginx/nginx.template
ENV PORT=80
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html
