import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://portfolio-backend-jet.vercel.app/"
})
