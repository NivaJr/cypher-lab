import { getToken, isAdmin } from './api.js';

// Verifica se o usuário está autenticado
export const checkAuth = () => {
    const token = getToken();
    if (!token) {
        // Redireciona para login se não houver token
        window.location.href = '/pages/auth/login.html';
        return false;
    }
    return true;
};

// Verifica se o usuário é admin
export const checkAdminAuth = () => {
    const token = getToken();
    if (!token) {
        // Redireciona para login se não houver token
        window.location.href = '/pages/auth/login.html';
        return false;
    }
    
    if (!isAdmin()) {
        // Redireciona para dashboard se não for admin
        window.location.href = '/pages/dashboard.html';
        return false;
    }
    
    return true;
};

// Previne acesso às páginas de login/cadastro se já estiver logado
export const checkGuest = () => {
    const token = getToken();
    if (token) {
        // Redireciona para dashboard se já estiver logado
        window.location.href = '/pages/dashboard.html';
        return false;
    }
    return true;
};
