FROM node:16
  
WORKDIR /usr/src/app

COPY . .
RUN npm install

ENV PORT=3000
ENV DATABASE_URL=postgres://postgres:postgres@db:5432/city_bike_db?schema=public

RUN npm --prefix ./front-end install
RUN npm run build:ui
RUN npx prisma generate
  
CMD npm run dev