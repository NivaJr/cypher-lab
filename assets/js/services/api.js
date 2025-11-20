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