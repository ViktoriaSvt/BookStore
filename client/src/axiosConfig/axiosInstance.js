import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.status === 304 && !response.data) {
  
      response.data = {};
    }
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        console.error("Unauthorized action!");
      } else if (error.response.status === 402) {
        console.error("Payment failed");
      } else {
        console.error("Error:", error.response || error.message || "Unknown error");
      }
    } else {
      console.error("Network error:", error.message);
    }
  }
);


export default axiosInstance;