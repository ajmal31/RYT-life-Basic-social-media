import express from "express";
import { connectDb } from "./config/db.js";
import constants from "./utils/constants.js";
import morgan from "morgan";
import userRouter from "./Routes/userRouter.js"

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/users",userRouter)

// connecting db
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
