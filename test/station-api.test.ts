import supertest from "supertest";
import app from "../app";
import { db } from "../prisma";
import { stations } from "../util/helperdata";
import { expect, test } from "@jest/globals";
import { stations as StationsSchema } from "@prisma/client";


const api = supertest(app);

beforeEach(async () => {
  await db.stations.deleteMany();
  await db.stations.createMany({
    data: stations,
  });
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

