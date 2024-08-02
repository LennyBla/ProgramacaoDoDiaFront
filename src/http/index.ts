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

    // Adiciona o token JWT ao cabeçalho de autorização
    const token = autenticaStore.usuario.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log("Added JWT token to request:", token);
    }

    // Set CSRF token
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
        console.log("Added CSRF token to request:", csrfToken);
    } else {
        console.error('CSRF token is missing');
    }

    return config;
}, (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
});

httpV2.interceptors.response.use(
    (response) => {
        console.log("Response received:", response);
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("401 Unauthorized, attempting to refresh token");
            try {
                await autenticaStore.refreshToken();
                const config = error.config;
                config.headers['Authorization'] = `Bearer ${autenticaStore.usuario.token}`;
                console.log("Retrying request with new token:", autenticaStore.usuario.token);
                return axios.request(config);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                autenticaStore.logout();
                autenticaStore.setSessaoExpirada(true);
                return Promise.reject(refreshError);
            }
        }

        console.error("Response error:", error);
        return Promise.reject(error);
    }
);

export { httpV1, httpV2 };
