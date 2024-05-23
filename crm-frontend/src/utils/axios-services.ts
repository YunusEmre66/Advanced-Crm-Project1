import axios from "axios";
import { base } from '@/configs/base'

const axiosServices = axios.create({
    baseURL: base.base,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

axiosServices.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token')
    config.headers = {
        ...config.headers,
        Authorization: `${token ?? ''}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default axiosServices