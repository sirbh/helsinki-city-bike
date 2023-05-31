CREATE TABLE temp_stations (
	id INT PRIMARY KEY,
	s_id INT,
	nimi VARCHAR ( 50 ),
	namn VARCHAR ( 50 ),
	name VARCHAR ( 50 ),
	osoite VARCHAR ( 255 ),
	address VARCHAR (255),
    city VARCHAR(50),
    stad VARCHAR(50),
    operator VARCHAR (255),
    capacity INT,
    x DECIMAL,
    y DECIMAL
);

CREATE TABLE temp_journeys (
    id SERIAL PRIMARY KEY,
    departure_time TIMESTAMP,
	return_time  TIMESTAMP,
    departure_station_id INT,
    departure_station_name VARCHAR(50),
    return_station_id INT,
    return_station_name VARCHAR(50),
    covered_distance DECIMAL,
    duration INT
);

COPY temp_journeys ("departure_time","return_time","departure_station_id","departure_station_name","return_station_id","return_station_name","covered_distance","duration")
FROM '../../../../files/2021-05.csv' 
DELIMITER ',' 
CSV HEADER;

COPY temp_journeys ("departure_time","return_time","departure_station_id","departure_station_name","return_station_id","return_station_name","covered_distance","duration")
FROM '../../../../files/2021-06.csv' 
DELIMITER ',' 
CSV HEADER;

COPY temp_journeys ("departure_time","return_time","departure_station_id","departure_station_name","return_station_id","return_station_name","covered_distance","duration")
FROM '../../../../files/2021-07.csv' 
DELIMITER ',' 
CSV HEADER;


COPY temp_stations
FROM '../../../../files/stations.csv' 
DELIMITER ',' 
CSV HEADER;

UPDATE temp_stations SET city = 'Espoo' WHERE city = ' ';
UPDATE temp_stations SET operator = 'CityBike Finland' WHERE operator = ' ';

CREATE TABLE stations (
	id INT PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	address VARCHAR (255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    operator VARCHAR (255) NOT NULL,
    capacity INT NOT NULL,
    x DECIMAL NOT NULL,
    y DECIMAL NOT NULL
);

INSERT INTO stations SELECT s_id,name,address,city,operator,capacity,x,y FROM temp_stations;


CREATE SEQUENCE station_seq START WITH 903;
ALTER TABLE stations ALTER COLUMN id SET DEFAULT nextval('station_seq');

DELETE FROM temp_journeys 
WHERE id IN (SELECT MIN(id) FROM temp_journeys
GROUP BY departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration
HAVING COUNT(*) > 1);

DELETE
FROM temp_journeys
WHERE covered_distance < 10;

DELETE
FROM temp_journeys
WHERE duration < 10;

DELETE
FROM temp_journeys
WHERE covered_distance is null;

CREATE TABLE journeys (
    id SERIAL PRIMARY KEY,
    departure_time TIMESTAMP NOT NULL,
	return_time  TIMESTAMP NOT NULL,
    departure_station_id INT NOT NULL,
    departure_station_name VARCHAR(50) NOT NULL,
    return_station_id INT NOT NULL,
    return_station_name VARCHAR(50) NOT NULL,
    covered_distance DECIMAL NOT NULL CHECK(covered_distance>=10),
    duration INT NOT NULL CHECK(duration>=10)
);

INSERT INTO journeys(departure_time,return_time,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration)
SELECT departure_time,return_time,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration
FROM temp_journeys;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR ( 50 ) NOT NULL,
	username VARCHAR (255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users
ADD CONSTRAINT username_unique UNIQUE (username);

ALTER TABLE stations  
ADD COLUMN user_id INT;  

ALTER TABLE stations  
ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id);


DROP TABLE temp_journeys;
DROP TABLE temp_stations;


