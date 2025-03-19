
FROM node:18

WORKDIR /app

COPY ./dist /app/dist

RUN npm install -g http-server

EXPOSE 9033


CMD ["http-server", "/app/dist", "-p", "5173", "--cors"]
