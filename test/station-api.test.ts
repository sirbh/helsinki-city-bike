import supertest from "supertest";
import app from "../app";
import { afterAll, expect, test } from "@jest/globals";
import { stations as StationsSchema } from "@prisma/client";
import { stations as stationsHelperData } from "../util/helperdata";
import { db } from "../prisma";

const api = supertest(app);

afterAll(async()=>{
  await db.$disconnect();
});

test("if stations api throw validation error", async () => {
  await api
    .get("/api/stations")
    .expect(403)
    .expect("property page is required");
});

test("if station api throw validation error if property take is missing", async () => {
  await api
    .get("/api/stations?page=12")
    .expect(403)
    .expect("property take is required");
});

test('if get stations api gives records equal to "take" with all property defined', async () => {
  const response = await api.get("/api/stations?page=1&take=5").expect(200);
  expect(response.body.details).toHaveLength(5);
  expect(response.body.count).toBe(stationsHelperData.length);
  const journeys_resp = response.body.details as StationsSchema[];
  journeys_resp.forEach((journey) => {
    expect(journey).toHaveProperty("id");
    expect(journey).toHaveProperty("name");
  });
});

test('if search stations api return validation error if property "query" is not provided', async () => {
  await api
    .get("/api/stations/search")
    .expect(403)
    .expect("property query is required");
});

test('if search stations api return correct result according to "query"', async () => {
  const response = await api.get("/api/stations/search?query=k").expect(200);
  const journeys_resp = response.body as StationsSchema[];

  journeys_resp.forEach(journey=>{
    expect(journey.name.split('')[0].toLowerCase()).toEqual('k');
  });

  const response2 = await api.get("/api/stations/search?query=ka").expect(200);
  const journeys_resp2 = response2.body as StationsSchema[];

  journeys_resp2.forEach(journey=>{
    expect(journey.name.slice(0,2).toLowerCase()).toEqual('ka');
  });
  
});
