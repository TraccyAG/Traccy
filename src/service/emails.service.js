import {axiosService} from "./axios.service";

export const emailsService ={
    saveEmail:(data)=> axiosService.post(`emails`,data),
    sendEmail:(data)=> axiosService.post(`emails/send`,data)
}