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

import authRouter from "./routers/auth.routes.js";
import sessionRouter from "./routers/session.routes.js";
import productRouter from "./routers/product.routes.js";
import cartRouter from "./routers/cart.routes.js";
import orderRouter from "./routers/order.routes.js";

import { client, httpRequestsDuration } from "./utils/monitoring/metrics.js";

const app = express();

/* ---------------------------- BASIC APP SETUP ---------------------------- */

app.set("trust proxy", 1);

/**
 * Helmet – allow cross-origin access for frontend apps
 */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false,
  })
);

/* ------------------------------- CORS SETUP ------------------------------- */

/**
 * ✅ SAFE FOR VERCEL + LOCAL + RENDER
 * - Allows all *.vercel.app deployments
 * - Allows localhost during dev
 * - Does NOT throw errors (critical)
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, health checks, curl, Postman
    if (!origin) return callback(null, true);

    // Allow Vercel deployments
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    // Allow local development
    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    console.warn("CORS blocked:", origin);
    return callback(null, false); // ❗ never throw
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ---------------------------- GLOBAL MIDDLEWARE --------------------------- */

app.use(morgan("dev"));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* ---------------------------- RATE LIMITING ------------------------------- */

const limiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    skip: (req) => req.method === "OPTIONS", 
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });

// Global limiter
app.use(limiter(15 * 60 * 1000, 1000));

// Route-specific limiters
const authLimiter = limiter(15 * 60 * 1000, 100);
const sessionLimiter = limiter(15 * 60 * 1000, 100);
const productLimiter = limiter(15 * 60 * 1000, 500);
const cartLimiter = limiter(15 * 60 * 1000, 500);
const orderLimiter = limiter(15 * 60 * 1000, 500);

/* --------------------------------- ROUTES -------------------------------- */

app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/session", sessionLimiter, sessionRouter);
app.use("/api/v1/product", productLimiter, productRouter);
app.use("/api/v1/cart", cartLimiter, cartRouter);
app.use("/api/v1/order", orderLimiter, orderRouter);

/* ------------------------------ METRICS ---------------------------------- */

app.use((req, res, next) => {
  const end = httpRequestsDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});

/* ------------------------------ HEALTH ----------------------------------- */

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ---------------------------- ERROR HANDLING ----------------------------- */

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
