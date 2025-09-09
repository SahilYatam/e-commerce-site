import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundHandler } from "./middlewares/globalErrorHandler.js";

import authRouter from "./routers/auth.routes.js"
import sessionRouter from "./routers/session.routes.js"

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
})

app.use("/api/v1/auth", limiter, authRouter);
app.use("/api/v1/session", limiter, sessionRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export {app}
