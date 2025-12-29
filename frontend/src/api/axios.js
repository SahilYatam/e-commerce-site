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
  response => response,
  async error => {
    console.log("Interceptor fired:", error.response?.status);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axios(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post("/session/refresh-access-token");

        processQueue(null);
        return axios(originalRequest);
      } catch (err) {
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
