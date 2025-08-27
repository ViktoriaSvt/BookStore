import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 304 && !response.data) {
      response.data = {};
    }
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          console.warn("Unauthorized or forbidden request");
          break;
        case 402:
          console.warn("Payment required");
          break;
        default:
          console.warn("Request error:", error.response.status, error.response.data);
      }
    } else {
      console.warn("Network or unknown error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
