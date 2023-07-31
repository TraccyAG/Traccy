import axios from "axios";

export const baseUrl= 'https://octopus-app-z7hd5.ondigitalocean.app/'
// export const baseUrl= 'http://localhost:5000/'

export const axiosService = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
});
