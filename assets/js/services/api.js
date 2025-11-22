const BACKEND_HOST = 'localhost';
const BACKEND_PORT = '8081';
export const API_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;
export const AUTH_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/auth`;
export const OAUTH2_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/oauth2`;

export const getToken = ()=> {
    return localStorage.getItem("authToken");
}

export const isAdmin = ()=> {
    return localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).role === 'ADMIN';
}

export const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    
    // Mescla headers padrão com headers customizados
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };
    
    // Configura as opções do fetch
    const config = {
        ...options,
        headers
    };
    
    return fetch(url, config);
}