FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci
RUN npm run tsc 
RUN npm --prefix ./front-end install
RUN npm run build:ui

ENV PORT=3000

EXPOSE  3000

CMD npm start
