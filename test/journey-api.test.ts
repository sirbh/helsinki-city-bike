import { expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../app";
import { db } from "../prisma";
import { journeys } from "../util/helperdata";
import {journeys as JourneysSchema} from "@prisma/client";


const api = supertest(app);

beforeEach(async () => {
  await db.journeys.deleteMany();
  await db.journeys.createMany({
    data: journeys,
  });
});

test("if journey api throw validation error", async () => {
  await api
    .get("/api/journeys")
    .expect(403)
    .expect("property page is required");
});

test("if journey api throw validation error if property take is missing", async () => {
  await api
    .get("/api/journeys?page=12")
    .expect(403)
    .expect("property take is required");
});

test('if get journey api gives records equal to "take" with all property defined', async () => {
  const response = await api.get("/api/journeys?page=1&take=5").expect(200);
  expect(response.body).toHaveLength(5);
  const journeys_resp = response.body as JourneysSchema[];
  journeys_resp.forEach(journey=>{
    expect(journey).toHaveProperty("id");
    expect(journey).toHaveProperty("departure_station_id");
    expect(journey).toHaveProperty("departure_station_name");
    expect(journey).toHaveProperty("return_station_id");
    expect(journey).toHaveProperty("return_station_name");
    expect(journey).toHaveProperty("covered_distance");
    expect(journey).toHaveProperty("duration");
  });
});

test('if we can sort journeys by duration', async ()=>{
  const response = await api.get("/api/journeys?page=1&take=5&property=duration&order=asc");
  const journeys_resp = response.body as JourneysSchema[];

  const durationArray = journeys_resp.map(journey=>journey.duration);
  const copy_journeys = [...journeys];
  copy_journeys.sort((a,b)=>a.duration-b.duration);
  const expectedDurationArray = copy_journeys.map(journey=>journey.duration).slice(0,5);
  console.log(durationArray);
  console.log(expectedDurationArray);
  expect(durationArray).toEqual(expectedDurationArray);
});

test('if we can sort journeys by covered_distance', async ()=>{
  const response = await api.get("/api/journeys?page=1&take=5&property=covered_distance&order=asc");
  const journeys_resp = response.body as JourneysSchema[];

  const testArray = journeys_resp.map(journey=>journey.covered_distance);
  const copy_journeys = [...journeys];
  copy_journeys.sort((a,b)=>a.covered_distance-b.covered_distance);
  const expectedArray = copy_journeys.map(journey=>journey.covered_distance.toString()).slice(0,5);

  expect(testArray).toEqual(expectedArray);
});
