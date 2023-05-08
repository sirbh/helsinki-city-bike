CREATE TABLE public.journeys (
    id integer NOT NULL,
    departure_time timestamp without time zone NOT NULL,
    return_time timestamp without time zone NOT NULL,
    departure_station_id integer NOT NULL,
    departure_station_name character varying(50) NOT NULL,
    return_station_id integer NOT NULL,
    return_station_name character varying(50) NOT NULL,
    covered_distance numeric NOT NULL,
    duration integer NOT NULL,
    CONSTRAINT journeys_covered_distance_check CHECK ((covered_distance >= (10)::numeric)),
    CONSTRAINT journeys_duration_check CHECK ((duration >= 10))
);

CREATE TABLE public.stations (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(50) NOT NULL,
    operator character varying(255) NOT NULL,
    capacity integer NOT NULL,
    x numeric NOT NULL,
    y numeric NOT NULL
);

COPY public.journeys (id, departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration) FROM stdin;
235	2021-05-31 22:26:01	2021-05-31 22:30:02	541	Aalto-yliopisto (M), Korkeakouluaukio	547	Jämeräntaival	1074	237
378	2021-05-31 21:55:56	2021-05-31 21:58:30	541	Aalto-yliopisto (M), Korkeakouluaukio	533	Tekniikantie	510	153
44671	2021-05-29 02:17:09	2021-05-29 02:22:53	547	Jämeräntaival	533	Tekniikantie	1132	343
44672	2021-05-29 02:17:08	2021-05-29 02:23:33	547	Jämeräntaival	533	Tekniikantie	1080	380
47	2021-05-31 23:30:06	2021-05-31 23:49:17	547	Jämeräntaival	547	Jämeräntaival	739	1146
577	2021-05-31 21:21:23	2021-05-31 21:23:14	547	Jämeräntaival	543	Otaranta	443	107
17386	2021-05-30 18:20:45	2021-05-30 18:24:10	543	Otaranta	541	Aalto-yliopisto (M), Korkeakouluaukio	667	199
20859	2021-05-30 15:44:02	2021-05-30 15:47:37	543	Otaranta	541	Aalto-yliopisto (M), Korkeakouluaukio	699	215
59777	2021-05-28 09:17:34	2021-05-28 10:01:15	29	Baana	545	Sähkömies	7892	2616
59778	2021-05-28 09:17:31	2021-05-28 09:58:47	29	Baana	545	Sähkömies	8486	2475
918535	2021-06-04 11:31:30	2021-06-04 11:58:51	543	Otaranta	29	Baana	7449	1637
1070370	2021-07-26 14:16:53	2021-07-26 15:01:43	543	Otaranta	29	Baana	9871	2685
814372	2021-06-09 16:09:58	2021-06-09 16:34:55	54	Gyldenintie	45	Brahen kenttä	6397	1492
836861	2021-06-08 16:16:21	2021-06-08 16:40:14	54	Gyldenintie	45	Brahen kenttä	6741	1433
44654	2021-05-29 02:22:29	2021-05-29 02:24:02	45	Brahen kenttä	45	Brahen kenttä	741.6700000000000	89
44982	2021-05-29 00:53:07	2021-05-29 01:28:59	45	Brahen kenttä	45	Brahen kenttä	3606	2147
1519982	2021-07-03 00:12:41	2021-07-03 00:31:37	45	Brahen kenttä	145	Pohjolankatu	3457	1131
520288	2021-06-23 11:53:01	2021-06-23 12:14:31	14	Senaatintori	245	Kulosaari (M)	5160	1285
360947	2021-05-04 05:36:24	2021-05-04 05:52:46	245	Kulosaari (M)	14	Senaatintori	5276	975
\.

COPY public.stations (id, name, address, city, operator, capacity, x, y) FROM stdin;
14	Senate Square	Alexandersgatan 22	Espoo	CityBike Finland	22	24.95264140046620	60.16912779191180
245	Kulosaari (M)	Ukko-Pekkas trappstig	Espoo	CityBike Finland	20	25.00646368718540	60.18892931031780
145	Pohjolankatu	Pohjolagatan 1	Espoo	CityBike Finland	12	24.94379640056670	60.21342099183550
45	Brahen kenttä	Helsingegatan 22	Espoo	CityBike Finland	20	24.95081315295170	60.18679028833110
54	Gyldenintie	Gyldénsvägen 2	Espoo	CityBike Finland	36	24.87666579967940	60.15838419165750
545	Sähkömies	Otsvängen 3	Espoo	CityBike Finland	12	24.82998500000000	60.18849900000000
29	Baana	Gräsviksgatan 23	Espoo	CityBike Finland	16	24.92257062079020	60.16411737248710
543	Otaranta	Otstranden 6	Espoo	CityBike Finland	22	24.83713300000000	60.18483000000000
533	Tekniikantie	Teknikvägen 3	Espoo	CityBike Finland	18	24.82474700000000	60.18080600000000
547	Jämeräntaival	Otsvängen 18	Espoo	CityBike Finland	30	24.83503300000000	60.18811800000000
541	Aalto University (M), Korkeakoulua	Otnäsvägen 10	Espoo	CityBike Finland	42	24.82667100000000	60.18431200000000
\.
