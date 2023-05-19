import supertest from "supertest";
import app from "../app";
import { afterAll, expect } from "@jest/globals";
import { db } from "../prisma";

const api = supertest(app);

test("if user registeration api throws validation error if username smaller than 3 chars", async () => {
  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "te",
      password: "password!2S",
    })
    .expect("username must be more than 2 chars");
});

test("if user registeration api throws validation error if name smaller than 3 chars", async () => {
  await api
    .post("/api/auth/register")
    .send({
      name: "te",
      username: "testusername",
      password: "password!2S",
    })
    .expect("name must be more than 2 chars");
});

test("if user registeration api throws validation error if password is not in correct format", async () => {
  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "password",
    })
    .expect(
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA",
    })
    .expect(
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA1",
    })
    .expect(
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA@",
    })
    .expect(
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );
});

describe("user registration", () => {
  beforeEach(async () => {
    await db.users.deleteMany({});
    await db.users.create({
      data: {
        name: "tempuser",
        username: "tempusername",
        password: "password!2A",
      },
    });
  });

  test("if user registeration api fails if unique username is not given", async () => {
    await api
      .post("/api/auth/register")
      .send({
        name: "testuser",
        username: "tempusername",
        password: "password!3S",
      })
      .expect("username must be unique");
  });

  test("if user registeration api return registered user if correct details are given", async () => {
    const resp = await api
      .post("/api/auth/register")
      .send({
        name: "testuser",
        username: "testusername",
        password: "password!3S",
      })
      .expect(200);
    

    expect(resp.body.name).toEqual('testuser');
    expect(resp.body.username).toEqual('testusername');

  });

  afterAll(async () => {
    await db.users.deleteMany({});
    await db.$disconnect();
  });
});
