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
  response => response,
  error => {
    if (error.response) {

      if (error.response.status === 403) {
        console.error("Unauthorized action for administrator roles!");
      } else if (error.response.status === 402) {
        console.error("Payment failed")
        return Promise.reject({ ...error, customMessage: error.message });
      } else {
        console.error("Error:", error.response.data.message || "Unknown error");
      }
    } else {
      console.error("Network error:", error.message);
    }
 
  }
);

export default axiosInstance;