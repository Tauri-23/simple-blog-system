import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;

    if(response.status === 401) { //Un authorized
        Cookies.remove("ACCESS_TOKEN");
    } 
    
    throw error;
})

export default axiosClient;