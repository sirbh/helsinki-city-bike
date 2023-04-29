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
    .expect(400)
    .expect("property page is required");
});

test("if journey api throw validation error if property take is missing", async () => {
  await api
    .get("/api/journeys?page=12")
    .expect(400)
    .expect("property take is required");
});

test('if get journey api gives records equal to "take" with all property defined', async () => {
  const response = await api.get("/api/journeys?page=1&take=5").expect(200);
  expect(response.body).toHaveLength(5);
  const journeys = response.body as JourneysSchema[];
  journeys.forEach(journey=>{
    expect(journey).toHaveProperty("id");
    expect(journey).toHaveProperty("departure_station_id");
    expect(journey).toHaveProperty("departure_station_name");
    expect(journey).toHaveProperty("return_station_id");
    expect(journey).toHaveProperty("return_station_name");
    expect(journey).toHaveProperty("covered_distance");
    expect(journey).toHaveProperty("duration");
  });
});
