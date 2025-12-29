import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://e-commerce-site-otow.onrender.com/api/v1",
    withCredentials: true,
    timeout: 60000
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve();
    });
    failedQueue = [];
};

axios.interceptors.response.use(
    response => {
        console.log("✅ Request successful:", response.config.url);
        return response
    },
    async error => {
        console.log("❌ Interceptor fired:", error.response?.status, error.config?.url);

        const originalRequest = error.config;

        if (originalRequest.url?.includes('/refresh-access-token')) {
            console.log("🔄 Refresh token request failed");
            window.dispatchEvent(new Event("auth:logout"));
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                console.log("⏳ Adding request to queue");
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axios(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.log("🔄 Attempting to refresh token");
                await axios.post("/session/refresh-access-token");
                console.log("✅ Token refreshed successfully");

                processQueue(null);
                return axios(originalRequest);
            } catch (err) {
                console.log("❌ Token refresh failed:", err);
                processQueue(err);
                // window.location.href = "/login";
                window.dispatchEvent(new Event("auth:logout"));
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axios;
