import express from "express";
import { connectDb } from "./config/db.js";
import constants from "./utils/constants.js";
const app = express();



connectDb(constants.MONGO_URI)
  .then(() => {
    console.info("data connection established succesfull");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.warn("database not connected", err?.message);
  });
