import supertest from "supertest";
import app from "../app";
import { afterAll, expect } from "@jest/globals";
import { db } from "../prisma";
import { hash } from "bcrypt";

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
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA",
    })
    .expect(
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA1",
    })
    .expect(
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );

  await api
    .post("/api/auth/register")
    .send({
      name: "testname",
      username: "testusername",
      password: "passwordA@",
    })
    .expect(
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    );
});

test("if login fails if username or password is not provided", async () => {
  await api.post("/api/auth/login").expect(403).expect("password is required");
  await api
    .post("/api/auth/login")
    .send({ password: "password" })
    .expect(403)
    .expect("username is required");
});

describe("authentication tests that require Database", () => {
  beforeEach(async () => {
    await db.users.deleteMany({});
    const passwordHash = await hash("password!2A", 10);
    await db.users.create({
      data: {
        name: "tempuser",
        username: "tempusername",
        password: passwordHash,
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
      .expect("username already exits");
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

    expect(resp.body.name).toEqual("testuser");
    expect(resp.body.username).toEqual("testusername");
  });

  test("if user login fails when wrong username is given", async () => {
    await api
      .post("/api/auth/login")
      .send({
        username: "wrongusername",
        password: "password!2A",
      })
      .expect(401)
      .expect("invalid username or password");
  });

  test("if login fails when wrong password is given", async () => {
    await api
      .post("/api/auth/login")
      .send({
        username: "tempusername",
        password: "password!4B",
      })
      .expect(401)
      .expect("invalid username or password");
  });

  test("if login succeed when correct details are given", async () => {
    const resp = await api
      .post("/api/auth/login")
      .send({
        username: "tempusername",
        password: "password!2A",
      })
      .expect(200);
      
      expect(resp.body.token).toBeDefined();
      expect(resp.body.name).toEqual("tempuser");
      expect(resp.body.username).toEqual("tempusername");
  });

  afterAll(async () => {
    await db.users.deleteMany({
      where:{
        username:'testusername'
      }
    });
    await db.$disconnect();
  });
});
