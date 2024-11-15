import express from "express";
import { connectDb } from "./config/db.js";
import constants from "./utils/constants.js";
import morgan from "morgan";
import userRouter from "./Routes/userRouter.js"
import postRouter from "./Routes/postRouter.js"
import cookieParser from "cookie-parser";
// import startServer from "./config/server.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)

// connecting db
connectDb(constants.MONGO_URI)
  .then(() => {
    console.info("data connection established succesfull");
    // startServer(app)
    
  })
  .catch((err) => {
    console.warn("database not connected", err?.message);
  });

export default app