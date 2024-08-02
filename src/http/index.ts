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
    if (!config.headers) {
        config.headers = {};
    }

    const token = autenticaStore.usuario.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    } else {
        console.error('CSRF token is missing');
    }

    return config;
});

httpV2.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            if (!autenticaStore.sessaoExpirada) {
                try {
                    await autenticaStore.refreshToken();
                    const config = error.config;
                    config.headers['Authorization'] = `Bearer ${autenticaStore.usuario.token}`;
                    return axios.request(config);
                } catch (refreshError) {
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