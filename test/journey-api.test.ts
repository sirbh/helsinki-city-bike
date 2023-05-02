import { expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../app";
import { journeys } from "../util/helperdata";
import { journeys as JourneysSchema } from "@prisma/client";

const api = supertest(app);


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
  expect(response.body.details).toHaveLength(5);
  expect(response.body.count).toBe(journeys.length);
  const journeys_resp = response.body.details as JourneysSchema[];
  journeys_resp.forEach((journey) => {
    expect(journey).toHaveProperty("id");
    expect(journey).toHaveProperty("departure_station_id");
    expect(journey).toHaveProperty("departure_station_name");
    expect(journey).toHaveProperty("return_station_id");
    expect(journey).toHaveProperty("return_station_name");
    expect(journey).toHaveProperty("covered_distance");
    expect(journey).toHaveProperty("duration");
  });
});

test("if we can sort journeys by duration", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&sort_prop=duration&order=asc"
  );
  const journeys_resp = response.body.details as JourneysSchema[];
  const durationArray = journeys_resp.map((journey) => journey.duration);

  const copy_journeys = [...journeys];
  copy_journeys.sort((a, b) => a.duration - b.duration);
  const expectedDurationArray = copy_journeys
    .map((journey) => journey.duration)
    .slice(0, 5);

  expect(durationArray).toEqual(expectedDurationArray);
});

test("if we can sort journeys by covered_distance", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&sort_prop=covered_distance&order=asc"
  );
  const journeys_resp = response.body.details as JourneysSchema[];

  const testArray = journeys_resp.map((journey) => journey.covered_distance);

  const copy_journeys = [...journeys];
  copy_journeys.sort((a, b) => a.covered_distance - b.covered_distance);
  const expectedArray = copy_journeys
    .map((journey) => journey.covered_distance.toString())
    .slice(0, 5);

  expect(testArray).toEqual(expectedArray);
});

test("if we can sort journeys by departure_station_name", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&sort_prop=departure_station_name&order=asc"
  );
  const journeys_resp = response.body.details as JourneysSchema[];

  const testArray = journeys_resp.map(
    (journey) => journey.departure_station_name
  );

  const copy_journeys = [...journeys];
  copy_journeys.sort((a, b) => {
    if (a.departure_station_name < b.departure_station_name) {
      return -1;
    } else if (a.departure_station_name > b.departure_station_name) {
      return 1;
    } else return 0;
  });
  const expectedArray = copy_journeys
    .map((journey) => journey.departure_station_name)
    .slice(0, 5);

  expect(testArray).toEqual(expectedArray);
});

test("if we can sort journeys by return_station_name", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&sort_prop=return_station_name&order=asc"
  );
  const journeys_resp = response.body.details as JourneysSchema[];

  const testArray = journeys_resp.map((journey) => journey.return_station_name);

  const copy_journeys = [...journeys];
  copy_journeys.sort((a, b) => {
    if (a.return_station_name < b.return_station_name) {
      return -1;
    } else if (a.return_station_name > b.return_station_name) {
      return 1;
    } else return 0;
  });
  const expectedArray = copy_journeys
    .map((journey) => journey.return_station_name)
    .slice(0, 5);

  expect(testArray).toEqual(expectedArray);
});

test("if we can filter journeys by return_station_id", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&sort_prop=return_station_name&order=asc&filter_prop=return_station_id&id=100"
  );
  const journeys_resp = response.body.details as JourneysSchema[];

  const testArray = journeys_resp.map((journey) => journey.return_station_id);

  expect(response.body.count).toBe(journeys.filter(j=>j.return_station_id===100).length);

  testArray.forEach((id) => {
    expect(id).toBe(100);
  });
});

test("if we can filter journeys by departure_station_id", async () => {
  const response = await api.get(
    "/api/journeys?page=1&take=5&filter_prop=departure_station_id&id=82"
  );
  const journeys_resp = response.body.details as JourneysSchema[];

  const testArray = journeys_resp.map(
    (journey) => journey.departure_station_id
  );

  expect(response.body.count).toBe(journeys.filter(j=>j.departure_station_id===82).length);

  testArray.forEach((id) => {
    expect(id).toBe(82);
  });
});
