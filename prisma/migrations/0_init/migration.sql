-- CreateTable
CREATE TABLE "journeys" (
    "id" SERIAL NOT NULL,
    "departure_time" TIMESTAMP(6) NOT NULL,
    "return_time" TIMESTAMP(6) NOT NULL,
    "departure_station_id" INTEGER NOT NULL,
    "departure_station_name" VARCHAR(50) NOT NULL,
    "return_station_id" INTEGER NOT NULL,
    "return_station_name" VARCHAR(50) NOT NULL,
    "covered_distance" DECIMAL NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "operator" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "x" DECIMAL NOT NULL,
    "y" DECIMAL NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

