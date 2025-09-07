import { app } from "./app.js";
import logger from "./utils/logger.js";
import { connectDB } from "./db/db.js";
import mongoose from "mongoose"

import dotenv from "dotenv";
dotenv.config();

let httpServer;
let isShuttingDown = false;
let port = process.env.PORT || 8000;

const server = async () => {
  try {
    await connectDB();

    httpServer = app.listen(port, () => {
      logger.info(`🚀 Server running on PORT: ${port}`);
    });

  } catch (error) {

    logger.error(
      `Failed to start server! error message: ${error.message}, error stack: ${error.stack}`
    );
    process.exit(1);
    
  }

  process.on("uncaughtException", async (error) => {
    await handleFatalError("uncaughtException", error);
  });

  process.on("unhandledRejection", async (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    await handleFatalError("unhandledRejection", error);
  });

  process.once("SIGINT", () => gracefulShutdown("SIGINT"));
  process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));

};

const handleFatalError = async (type, error) => {
  if (isShuttingDown) return;

  logger.error(
    `🚨 ${type.toUpperCase()} in ${currentServiceName}: ${error.message}`
  );
  logger.error(error.stack);
  await gracefulShutdown(type);
};

const SHUTDOWN_TIMEOUT = 10000; // 10 seconds

const gracefulShutdown = async (signal) => {
    if (isShuttingDown) {
        logger.info("Shutdown already in progress, ignoring signal");
        return;
    }

    isShuttingDown = true

    logger.info(`🛑 Shutting down (${signal})...`);

    const shutdownTimer = setTimeout(() => {
        logger.error("Force shutdown after timeout");
        process.exit(1);
    }, SHUTDOWN_TIMEOUT);

    try {
        if(httpServer){
            await new Promise((resolve) => httpServer.close(() => resolve()));
            logger.info("🛑 HTTP server closed");
        }

        if(mongoose.connection.readyState === 1){
            await mongoose.disconnect();
            logger.info("🔌 MongoDB connection closed")
        }
        clearTimeout(shutdownTimer);
        logger.info(`✅ Shutdown complete`);
        process.exit(0);
    } catch (error) {
        clearTimeout(shutdownTimer);
        logger.error(`Error during shutdown: ${error.message}`);
        process.exit(1);
    }
} 

server();
