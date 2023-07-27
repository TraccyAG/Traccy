import axios from "axios";

// const baseUrl= 'https://octopus-app-z7hd5.ondigitalocean.app/'
const baseUrl= 'http://localhost:5000'

export const axiosService = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
});
