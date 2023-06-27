import axios from "axios";

const baseUrl= 'https://octopus-app-z7hd5.ondigitalocean.app/'

export const axiosService = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
});
