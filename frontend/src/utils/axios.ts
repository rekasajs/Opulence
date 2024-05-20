import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5000/app/',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;
