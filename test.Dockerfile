FROM cypress/base:16
  
WORKDIR /usr/src/app

COPY . .
RUN npm install

ENV PORT=3000
ENV DATABASE_URL=postgres://testuser:postgres@db:5432/test_city_bike_db?schema=public
ENV BASE_URL=http://backend:3000

RUN npm --prefix ./front-end install
RUN npm run build:ui
RUN npx prisma generate

  