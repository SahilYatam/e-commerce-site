import client from "prom-client";

client.collectDefaultMetrics();

// custom metrics
export const httpRequestsDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 1.5, 10, 300, 400, 500],
});

export { client };

