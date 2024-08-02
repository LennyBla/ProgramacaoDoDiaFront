import axios from "axios";
import Cookies from 'js-cookie';
import autenticaStore from '../stores/autentica.store';

const httpV1 = axios.create({
    baseURL: 'https://programacaododia-back.vercel.app/api/v1/',
});

const httpV2 = axios.create({
    baseURL: 'https://programacaododia-back.vercel.app/api/v2/',
    withCredentials: true
});

httpV2.interceptors.request.use((config) => {
    console.log('Request Interceptor - Start');
    if (!config.headers) {
        config.headers = {};
    }

    const token = autenticaStore.usuario.token;
    if (token) {
        console.log('Adding Authorization header');
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        console.log('Adding CSRF token');
        config.headers['X-CSRFToken'] = csrfToken;
    } else {
        console.error('CSRF token is missing');
    }

    console.log('Request Interceptor - End', config);
    return config;
});

httpV2.interceptors.response.use(
    (response) => {
        console.log('Response Interceptor - Success', response);
        return response;
    },
    async (error) => {
        console.error('Response Interceptor - Error', error);
        if (error.response && error.response.status === 401) {
            console.warn('401 Unauthorized - Attempting to refresh token');
            if (!autenticaStore.sessaoExpirada) {
                try {
                    await autenticaStore.refreshToken();
                    const config = error.config;
                    config.headers['Authorization'] = `Bearer ${autenticaStore.usuario.token}`;
                    console.log('Retrying original request with new token', config);
                    return axios.request(config);
                } catch (refreshError) {
                    console.error('Error refreshing token', refreshError);
                    autenticaStore.logout();
                    autenticaStore.setSessaoExpirada(true);
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export { httpV1, httpV2 };
