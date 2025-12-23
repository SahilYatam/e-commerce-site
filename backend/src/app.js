import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundHandler } from "./middlewares/globalErrorHandler.js";

import authRouter from "./routers/auth.routes.js"
import sessionRouter from "./routers/session.routes.js"
import productRouter from "./routers/product.routes.js"
import cartRouter from "./routers/cart.routes.js"
import orderRouter from "./routers/order.routes.js"


import { client, httpRequestsDuration } from "./utils/monitoring/metrics.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://e-commerce-site-nine-eta.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));


app.use(morgan("dev"));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
})

function limiter(windowMs, max) {
    return rateLimit({
        windowMs,
        max,
        message: "Too many requests, please try again later.",
        standardHeaders: true,
        legacyHeaders: false

    });
}

// global limiter, applies to all routes
const globalRateLimiting = limiter(15 * 60 * 1000, 1000) // 15 minutes, 1000 requests
app.use(globalRateLimiting);

const authLimiter = limiter(15 * 60 * 1000, 100);
const sessionLimiter = limiter(15 * 60 * 1000, 100);
const productLimiter = limiter(15 * 60 * 1000, 500)
const cartLimiter = limiter(15 * 60 * 1000, 500)
const orderLimiter = limiter(15 * 60 * 1000, 500)

app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/session", sessionLimiter, sessionRouter);
app.use("/api/v1/product", productLimiter, productRouter)
app.use("/api/v1/cart", cartLimiter, cartRouter)
app.use("/api/v1/order", orderLimiter, orderRouter)


app.use((req, res, next) => {
    const end = httpRequestsDuration.startTimer();
    res.on("finish", () => {
        end({ method: req.method, route: req.path, status_code: res.statusCode })
    });

    next();
})
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.send(await client.register.metrics());
})

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});


app.use(errorHandler);
app.use(notFoundHandler);

export { app }
