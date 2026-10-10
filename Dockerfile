FROM node:14

WORKDIR /app

ENV DB_PASSWORD=dev_db_password_123
ENV REDIS_PASSWORD=dev_redis_pass
ENV JWT_SECRET=dev-jwt-secret-change-me

ADD package.json /app/
RUN npm install

ADD . /app/

EXPOSE 3000

CMD ["node", "server.js"]
