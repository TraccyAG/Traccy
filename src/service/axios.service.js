import axios from "axios";

const baseUrl= 'http://localhost:5000/'

export const axiosService = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
});
