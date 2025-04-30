import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://cyberjob-server.onrender.com/api",
});

// Attach token to all outgoing requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Attach Bearer token
  }
  return config;
});

export default API;
