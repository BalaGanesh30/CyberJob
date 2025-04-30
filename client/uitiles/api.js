import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api",
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
