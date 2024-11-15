import express from "express";
import { connectDb } from "./db.js";
import constants from "../utils/constants.js";
import morgan from "morgan";
import userRouter from "../Routes/userRouter.js"
import postRouter from "../Routes/postRouter.js"
import cookieParser from "cookie-parser";
// import startServer from "./config/server.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)

export default app