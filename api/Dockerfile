FROM node:latest

RUN npm install -g nodemon

EXPOSE 3000
WORKDIR /api

CMD npm install;\
	npm audit fix;\
	nodemon server.js;
