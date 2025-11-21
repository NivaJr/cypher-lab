import { getEmailInitials } from "../pages/user.js";

fetch('../../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('headerComponent').innerHTML = data;
        // Exibir nome do usuário
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.username) {
            
            document.getElementById('headerAvatar')
            .textContent = userData.email ? getEmailInitials(userData.email) : 'U';
        }
        const btnLogout = document.getElementById('btnLogout');
        document.getElementById('headerAvatar').addEventListener('click', () => {
            
            btnLogout.style.display =           btnLogout.style.display === 'block' ? 'none' : 'block';
        })
        


        // Botão de logout
        btnLogout.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = '../../pages/auth/login.html';
            }
        });
    })
    .catch(error => console.error('Erro ao carregar header admin:', error));
