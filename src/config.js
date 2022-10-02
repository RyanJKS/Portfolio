import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://jhelan-backend.herokuapp.com/"
})