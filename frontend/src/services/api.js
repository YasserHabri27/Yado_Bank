import axios from ;

const api = axios.create({
    baseURL: ,
    headers: {
        : ,
    },
});

api.interceptors.request.use(
    (config) => {
        const utilisateur = JSON.parse(localStorage.getItem());
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
            
            
            
        }
        return Promise.reject(error);
    }
);

export default api;
