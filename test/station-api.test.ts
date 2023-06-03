import supertest from "supertest";
import app from "../app";
import { afterAll, beforeAll, expect, test } from "@jest/globals";
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

describe("stations api should return station added by user if username is provided in request",()=>{
  let token = "";
  beforeAll(async ()=>{
    const response = await api.post("/api/auth/login").send({
      username: "tempusername",
      password: "password!2A",
    });
    const details = response.body as { token: string };
    token = details.token;
    await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4,
      x: 12,
      y: 4,
    });
  },10000);

  

  afterAll(async ()=>{
    await db.stations.deleteMany({
      where:{
        name:'test name'
      }
    });
  });

  test('if get stations api return station added by authenticated user if username is given', async () => {
    const response = await api.get("/api/stations?page=1&take=5&username=tempusername");
    expect(response.body.details).toHaveLength(1);
    expect(response.body.count).toBe(1);
    const journeys_resp = response.body.details as StationsSchema[];
    journeys_resp.forEach((journey) => {
      expect(journey.name).toEqual('test name');
      expect(journey.address).toEqual('test address');
      expect(journey.city).toEqual('test city');
    });
  },10000);
});


