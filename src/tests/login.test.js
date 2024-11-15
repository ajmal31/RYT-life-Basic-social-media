import mongoose from "mongoose";
import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../config/expressConfig.js";
import constants from "../utils/constants.js";
import { UserModel } from "../models/userSchema.js";

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(constants.MONGO_URI_TEST);
});

/* Clearing the database before each test. */
beforeEach(async () => {
  await UserModel.deleteMany();
});

/* Closing the database connection after all tests. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/v1/users/login", () => {
  //TEST 1
  it("should successfully login an existing user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password@@##123Ab",
    };

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    // Create the user with the hashed password
    const createdUser = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });

    const response = await request.post("/api/v1/users/login").send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("login successful");
    expect(response.body.data).toHaveProperty("token");

    // Verify that a token was returned (you can verify the token further)
    expect(response.body.data.token).toBeTruthy();
  });
  // TEST 2
  it("should return an error if email is not registered", async () => {
    const nonExistentUser = {
      email: "nonexistent@example.com",
      password: "password@@##123Ab",
    };

    const response = await request
      .post("/api/v1/users/login")
      .send(nonExistentUser);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Invalid credentials");
  });
  // TEST 3
  it("should return an error if password is incorrect", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password@@##123Ab",
    };

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    // Create the user with the hashed password
    await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });

    const response = await request.post("/api/v1/users/login").send({
      email: newUser.email,
      password: "incorrectpassword", // Sending incorrect password
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
  // TEST 4
  it("should return an error if email or password is missing", async () => {
    const incompleteLoginData = {
      email: "test@example.com", // Missing password
    };

    const response = await request
      .post("/api/v1/users/login")
      .send(incompleteLoginData);

    expect(response.status).toBe(400); // Assuming validation handles missing fields with 400
    expect(response.body.message).toBeDefined(); // Expecting some error message for missing fields
  });
  // TEST 5
  it("should return an error for invalid email format", async () => {
    const invalidEmailLogin = {
      email: "invalidEmail", // Invalid email format
      password: "password@@##123Ab",
    };

    const response = await request
      .post("/api/v1/users/login")
      .send(invalidEmailLogin);

    expect(response.status).toBe(400); // Assuming validation throws 400 for invalid inputs
    expect(response.body.message).toBeDefined(); // Expecting an error about the invalid email format
  });
});
