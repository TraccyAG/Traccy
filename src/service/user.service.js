import {axiosService} from "./axios.service";

export const userService = {
    getUserById: (id) => axiosService.get(`user/${id}`),
    saveAgreement: (id, data) => axiosService.post(`user/${id}/agreements`, data),
    createAgreement: (id, data) => axiosService.post(`documents/${id}`, data),
    updateUser: (id, data) => axiosService.patch(`user/update/${id}`, data),
}
