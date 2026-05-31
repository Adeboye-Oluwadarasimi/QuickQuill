import axios from "axios";

const api = axios.create({
  baseURL: "https://quickquill-backend-q8id.onrender.com/api",
});

export default api;
