const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const gravatar = require("gravatar");
const bCrypt = require("bcrypt");

require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;
const User = require("../models/user");

describe("test login controller", () => {
  let server;

  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      server = app.listen(PORT);
    } catch (error) {
      console.error("Error setting up server:", error);
      throw error;
    }
  });

  afterAll(async () => {
    if (server) {
      await server.close();
    }
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    const password = await bCrypt.hash("123456", 10);

    const newUserData = {
      email: "example@mail.com",
      password,
      avatarURL: gravatar.url(),
    };

    await User.create(newUserData);
  });

  afterEach(async () => {
    const user = await User.findOne({ email: "example@mail.com" });
    await User.findByIdAndDelete(user.id);
  });

  test("test login retur value", async () => {
    const userLoginData = {
      email: "example@mail.com",
      password: "123456",
    };

    const result = await request(app).post("/users/login").send(userLoginData);
    const { body } = result;

    expect(result.statusCode).toBe(200);
    expect(body.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });

    const user = await User.findOne({ email: "example@mail.com" });
    expect(body.token).toBe(user.token);
  });
});
