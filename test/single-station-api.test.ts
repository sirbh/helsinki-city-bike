import supertest from "supertest";
import app from "../app";
import {stations as StationSchema} from '@prisma/client';
import { expect } from "@jest/globals";
import { getAvgDistanceEndingOnStation, getAvgDistanceStartingFromStation, getJourneyEnding, getJourneyStarting, getPopularDepartureStation, getPopularReturnStation, getStationDetailsByID } from "../util/testHelper";


const api = supertest(app);

test("if stations api gets station details", async () => {
    const response = await api
      .get("/api/stations/245")
      .expect(200);
    
    const stationDetails = response.body.details as StationSchema;
    const expectedDetails = getStationDetailsByID(245);
    expect(stationDetails.id).toBe(expectedDetails?.id);
    expect(stationDetails.address).toBe(expectedDetails?.address);
    expect(stationDetails.capacity).toBe(expectedDetails?.capacity);
    expect(stationDetails.city).toBe(expectedDetails?.city);
    expect(stationDetails.name).toBe(expectedDetails?.name);
    expect(stationDetails.operator).toBe(expectedDetails?.operator);
    expect(stationDetails.x.toString()).toBe(expectedDetails?.x.toString());
    expect(stationDetails.y.toString()).toBe(expectedDetails?.y.toString());
  });

  test("if stations api gets correct number of departure from the station", async () => {
    const response = await api
      .get("/api/stations/245")
      .expect(200);
    
    const departures = response.body.total_departures as number;
    expect(departures).toBe(getJourneyStarting(245));
  });

  test("if stations api gets correct number of returns to the station", async () => {
    const response = await api
      .get("/api/stations/541")
      .expect(200);
    
    const returns = response.body.total_departures as number;
    expect(returns).toBe(getJourneyEnding(541));
  });

  test("if stations api gets correct avg distance of journeys starting from station", async () => {
    const response = await api
      .get("/api/stations/45")
      .expect(200);
    
    const avg_departure_distance = response.body.avg_departure_distance as string;
    expect(parseFloat(avg_departure_distance)).toBeCloseTo(getAvgDistanceStartingFromStation(45),2);
  });


  test("if stations api gets correct avg distance of journeys ending at station", async () => {
    const response = await api
      .get("/api/stations/45")
      .expect(200);
    
    const avg_return_distance = response.body.avg_return_distance as string;
    expect(parseFloat(avg_return_distance)).toBeCloseTo(getAvgDistanceEndingOnStation(45),2);
  });

  test("if stations api gets correct popular departure stations", async () => {
    const response = await api
      .get("/api/stations/54")
      .expect(200);
    
    const popular_departure_stations = response.body.popular_departure_stations as Array<{
      _count:{
        return_station_id:number
      },
      departure_station_id:number,
      departure_station_name:string
  }>;
    expect(popular_departure_stations.length).toBe(getPopularDepartureStation(54).length);
    expect(popular_departure_stations).toEqual([]);
  });

  test("if stations api gets correct popular return stations", async () => {
    const response = await api
      .get("/api/stations/533")
      .expect(200);
    
    const popular_return_station = response.body.popular_return_station as Array<{
      _count:{
        departure_station_id:number
      },
      return_station_id:number,
      return_station_name:string
    }>;
    const expected_popular_stations = getPopularReturnStation(533);

    expect(popular_return_station.length).toBe(expected_popular_stations.length);
    
    popular_return_station.forEach((station,index)=>{
      expect(station._count.departure_station_id).toBe(expected_popular_stations[index].count);
      expect(station._count.departure_station_id).toBe(expected_popular_stations[index].id);
    });
  });