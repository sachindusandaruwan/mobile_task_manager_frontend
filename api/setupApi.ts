import axios from "axios";

// Base axios instance (no redux, no interceptors)
const setupApi = axios.create({
    baseURL: "http://10.41.112.8:3000",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },

});

export default setupApi;
