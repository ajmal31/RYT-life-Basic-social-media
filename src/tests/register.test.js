import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import constants from "../utils/constants.js";
import { UserModel } from "../models/userSchema.js";

const request = supertest(app); // Create the `request` object for testing

/* Connecting to the database before all tests. */
beforeAll(async () => {
  await mongoose.connect(constants.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/* Clearing the database before each test. */
beforeEach(async () => {
  await UserModel.deleteMany(); // Clear users collection before each test
});

/* Closing the database connection after all tests. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/v1/users/register", () => {
  it("should successfully register a new user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password@@##123Ab",
    };

    const response = await request.post("/api/v1/users/register").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user created");
    expect(response.body.data).toHaveProperty("userId");

    // Verify the user is saved in the database
    const userInDb = await UserModel.findOne({ email: newUser.email });
    expect(userInDb).toBeTruthy();
    expect(userInDb.username).toBe(newUser.username);
  });

  it("should return an error if email is already registered", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      password: "password@@##123Ab",
    };

    // Create a user directly in the database
    await UserModel.create(newUser);

    const response = await request.post("/api/v1/users/register").send(newUser);
   console.info(response)
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("user already exists");
  });

  it("should return an error if required fields are missing", async () => {
    const incompleteUser = {
      username: "testuser",
      // Missing email and password
    };

    const response = await request.post("/api/v1/users/register").send(incompleteUser);

    expect(response.status).toBe(400); // Assuming your validation throws 400 for bad requests
    expect(response.body.message).toBeDefined(); // Expecting some error message
  });

  it("should return an error for invalid email format", async () => {
    const invalidUser = {
      username: "testuser",
      email: "invalidEmail",
      password: "password@@##123Ab",
    };

    const response = await request.post("/api/v1/users/register").send(invalidUser);

    expect(response.status).toBe(400); // Assuming your validation throws 400 for invalid inputs
    expect(response.body.message).toBeDefined();
  });
});
