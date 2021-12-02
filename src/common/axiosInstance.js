import axios from "axios";
import { InitState, LocalStorageText } from "../contants/common.js";
import moment from 'moment';

const baseURL = '/api';

let headers = {};
headers['content-type'] = 'application/json'

const axiosInstance = axios.create({
    baseURL,
    headers
})

axiosInstance.interceptors.request.use(async (config) => {
    const isTokenHave = localStorage.token && localStorage.token !== InitState
    if (isTokenHave) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.token;
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    const token = response?.data?.token
    if (token) {
        localStorage.setItem(LocalStorageText.Token, token)
    }

    const tokenValue = token ? token : localStorage.getItem(LocalStorageText.Token);
    if (tokenValue != 'init') {
        const decodedJwt = JSON.parse(atob(tokenValue.split('.')[1]));
        if (decodedJwt.exp * 1000 < moment().valueOf()) {
            localStorage.removeItem(LocalStorageText.Token);
            window.location = '/login'
        }
    }
    
    return Promise.resolve(response.data)
}, (error) => {
    if (!error.response) {
        return Promise.reject(error.response.data)
    }

    const errorHttpCode = [401, 403]
    if (errorHttpCode.includes(error.response.status)) {
        localStorage.removeItem(LocalStorageText.Token);
        window.location = '/login'
    } else {
        return Promise.reject(error.response.data)
    }
})

export default axiosInstance
