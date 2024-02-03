import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DB_HOST;
const axiosInstance = axios.create({
    baseURL: baseUrl
});

export default axiosInstance;
