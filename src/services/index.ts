import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const backendAPI = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
