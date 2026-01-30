import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
        if (utilisateur && utilisateur.token) {
            config.headers.Authorization = `Bearer ${utilisateur.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Auto logout if 401? Maybe, or just reject
            // localStorage.removeItem('utilisateur');
            // window.location.href = '/connexion';
        }
        return Promise.reject(error);
    }
);

export default api;
