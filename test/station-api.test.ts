import supertest from "supertest";
import app from "../app";
import { expect, test } from "@jest/globals";
import { stations as StationsSchema } from "@prisma/client";

const api = supertest(app);


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

test('if get journey api gives records equal to "take" with all property defined', async () => {
  const response = await api.get("/api/stations?page=1&take=5").expect(200);
  expect(response.body).toHaveLength(5);
  const journeys_resp = response.body as StationsSchema[];
  journeys_resp.forEach((journey) => {
    expect(journey).toHaveProperty("id");
    expect(journey).toHaveProperty("name");
    expect(journey).toHaveProperty("address");
    expect(journey).toHaveProperty("city");
    expect(journey).toHaveProperty("operator");
    expect(journey).toHaveProperty("capacity");
    expect(journey).toHaveProperty("x");
    expect(journey).toHaveProperty("y");
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
