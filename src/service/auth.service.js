import {axiosService} from "./axios.service";

export const authService = {
    registration: (data) => axiosService.post('auth/registration', data),
    login: (data) => axiosService.post('auth/login', data),
    logout: (token) => axiosService.post('auth/logout', {token}),
    resetMailPassword: (email) => axiosService.post('auth/resetPassword', {email}),
    resetPassword: (data) => axiosService.post('auth/createNewPassword', data)
}