import { app } from "./app.js";
import logger from "./utils/logger/logger.js";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";

let httpServer;
let isShuttingDown = false;
const port = process.env.PORT || 8000;

const server = async () => {
    try {
        await connectDB();

        httpServer = app.listen(port, () => {
            logger.info(`🚀 Server running on PORT: ${port}`);
        });

        // Handle server errors
        httpServer.on("error", (error) => {
            logger.error(`Server error: ${error.message}`);
            if (error.code === "EADDRINUSE") {
                logger.error(`Port ${port} is already in use`);
                process.exit(1);
            }
        });

    } catch (error) {
        logger.error(`Failed to start server! error message: ${error.message}, error stack: ${error.stack}`);
        process.exit(1);
    }
};

const handleFatalError = async (type, error) => {
    if (isShuttingDown) return;

    logger.error(`🚨 ${type.toUpperCase()}: ${error.message}`);
    if (error.stack) {
        logger.error(error.stack);
    }
    await gracefulShutdown(type);
};

const SHUTDOWN_TIMEOUT = 10000; // 10 seconds

const gracefulShutdown = async (signal) => {
    if (isShuttingDown) {
        logger.info("Shutdown already in progress, ignoring signal");
        return;
    }

    isShuttingDown = true;

    logger.info(`🛑 Shutting down (${signal})...`);

    const shutdownTimer = setTimeout(() => {
        logger.error("⚠️ Force shutdown after timeout");
        process.exit(1);
    }, SHUTDOWN_TIMEOUT);

    try {
        // Close HTTP server
        if (httpServer) {
            await new Promise((resolve, reject) => {
                httpServer.close((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            logger.info("🛑 HTTP server closed");
        }

        // Close MongoDB connection
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            logger.info("🔌 MongoDB connection closed");
        }

        clearTimeout(shutdownTimer);
        logger.info("✅ Shutdown complete");
        process.exit(0);
    } catch (error) {
        clearTimeout(shutdownTimer);
        logger.error(`❌ Error during shutdown: ${error.message}`);
        process.exit(1);
    }
};

// Start server
server().catch((error) => {
    logger.error(`Fatal error starting server: ${error.message}`);
    process.exit(1);
});

// Global error handlers - setup AFTER server starts
process.on("uncaughtException", async (error) => {
    logger.error("🚨 Uncaught Exception:", error);
    await handleFatalError("uncaughtException", error);
});

process.on("unhandledRejection", async (reason, promise) => {
    logger.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
    const error = reason instanceof Error ? reason : new Error(String(reason));
    await handleFatalError("unhandledRejection", error);
});

// Graceful shutdown signals
process.once("SIGINT", () => gracefulShutdown("SIGINT"));
process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));