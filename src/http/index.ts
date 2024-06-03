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
    }

    // Set CSRF token
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    } else {
        console.error('CSRF token is missing');
    }

    return config;
});

export { httpV1, httpV2 };
