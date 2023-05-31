import supertest from "supertest";
import app from "../app";
import { afterAll, beforeAll, expect, test } from "@jest/globals";
import { stations } from "@prisma/client";
import { db } from "../prisma";

const api = supertest(app);
let token = "";

beforeAll(async () => {
  const response = await api.post("/api/auth/login").send({
    username: "tempusername",
    password: "password!2A",
  });
  const details = response.body as { token: string };
  token = details.token;
});

afterAll(async () => {
  await db.$disconnect();
});

test("if add-station fails without authentication", async () => {
  await api
    .post("/api/stations")
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4,
      x: 12,
      y: 4,
    })

    .expect("token invalid");
});

test("if add station fails if name less than 3 chars is provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("name is required field");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "te",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("name should be more than 3 characters");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("name is required field");
});

test("if add station fails if address less than 3 chars is provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("address is required field");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "te",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("address should be more than 3 characters");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      city: "test city",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("address is required field");
});

test("if add station fails if operator less than 3 chars is provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("operator is required field");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "te",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("operator should be more than 3 characters");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      address: "test address",
      city: "test city",
      name: "test name",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("operator is required field");
});

test("if add station fails if city less than 3 chars is provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("city is required field");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "te",
      address: "test address",
      city: "te",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("city should be more than 3 characters");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      address: "test address",
      name: "test name",
      operator: "test operator",
      capacity: 3,
      x: -45,
      y: 4,
    })
    .expect("city is required field");
});

test("if add station fails if capacity less than 1 is provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "",
      operator: "test operator",
      capacity: 0,
      x: -45,
      y: 4,
    })
    .expect("capacity should be more than 0");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "te",
      address: "test address",
      city: "te",
      operator: "test operator",
      x: -45,
      y: 4,
    })
    .expect("capacity is required field");
});

test("if add station fails if capacity is not a number", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: "not a number",
      x: -45,
      y: 4,
    })
    .expect("capacity should be a number");
});

test("if add station fails if capacity is not a number", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4.5,
      x: -45,
      y: 4,
    })
    .expect("capacity should be a integer");
});

test("if add station fails if lat and log is not provided", async () => {
  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4.5,
      y: 4,
    })
    .expect("lat is required");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4.5,
      x: 4,
    })
    .expect("long is required");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4.5,
      x: 4,
      y: "",
    })
    .expect("long should be a number");

  await api
    .post("/api/stations")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4.5,
      x: "",
      y: 4,
    })
    .expect("lat should be a number");
});

describe("test that require db access", () => {
  test("if station can be added if correct details are provided", async () => {
    const response = await api
      .post("/api/stations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        name: "test name",
        address: "test address",
        city: "test city",
        operator: "test operator",
        capacity: 4,
        x: 4,
        y: 4,
      });
    const details = response.body as stations;
    expect(details).toEqual({
      id: 1,
      name: "test name",
      address: "test address",
      city: "test city",
      operator: "test operator",
      capacity: 4,
      x: "4",
      y: "4",
      user_id: 130,
    });
  });

  test("if station added by user can be deleted", async () => {
    await api
      .post("/api/stations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 2,
        name: "test name2",
        address: "test address2",
        city: "test city2",
        operator: "test operator2",
        capacity: 42,
        x: 42,
        y: 42,
      });
    const response = await api.get("/api/stations/2");
    expect(response.body.details).toHaveProperty("name");

    await api.delete("/api/stations/2").set("Authorization", `Bearer ${token}`);

    const confirmResponse = await api.get("/api/stations/2");
    expect(confirmResponse.body.details).toBeNull();
  }, 15000);

  test("if station not added by user cannot be deleted", async () => {
    const response = await api.get("/api/stations/14");
    expect(response.body.details).toHaveProperty("name");

    await api
      .delete("/api/stations/14")
      .set("Authorization", `Bearer ${token}`);

    const confirmResponse = await api.get("/api/stations/14");
    expect(confirmResponse.body.details).toHaveProperty("name");
  }, 15000);

  afterAll(async () => {
    await db.stations.delete({
      where: {
        id: 1,
      },
    });
  });
});
