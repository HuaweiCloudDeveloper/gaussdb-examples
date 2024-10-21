import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api',
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;