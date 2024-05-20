import axios from "axios";
import Cookies from 'js-cookie';

const httpV1 = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
});

const httpV2 = axios.create({
    baseURL: 'http://localhost:8000/api/v2/',
    withCredentials: true
});

httpV2.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {};
    }

    try {
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        } else {
            console.error('CSRF token is missing');
        }
    } catch (error) {
        console.error('Error retrieving CSRF token:', error);
    }

    return config;
});

export { httpV1, httpV2 };
