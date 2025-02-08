import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {

      if (error.response.status === 403) {
        console.error("Unauthorized action for administrator roles!");
      } else {
        console.error("Error:", error.response.data.message || "Unknown error");
      }
    } else {
      console.error("Network error:", error.message);
    }
 
    return 'denied';
  }
);

export default axiosInstance;