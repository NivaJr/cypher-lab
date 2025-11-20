// Carregar header admin
fetch('../../components/headerAdmin.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('headerAdminComponent').innerHTML = data;
        
        // Exibir nome do usuário
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.username) {
            document.getElementById('adminUserName').textContent = userData.username;
        }
        
        // Botão de logout
        document.getElementById('btnLogout')?.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = '../../pages/auth/login.html';
            }
        });
    })
    .catch(error => console.error('Erro ao carregar header admin:', error));
