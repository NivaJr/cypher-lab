document.addEventListener('DOMContentLoaded', function() {
            
    function showMessage(text, type = 'success') {
        const messageBox = document.getElementById('message-box');
        if (!messageBox) return;

        messageBox.textContent = text;
        
        messageBox.classList.remove('bg-green-500', 'bg-red-500', 'hidden');
        
        if (type === 'success') {
            messageBox.classList.add('bg-green-500');
        } else if (type === 'error') {
            messageBox.classList.add('bg-red-500');
        }
        
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }
    
    const editButton = document.getElementById('edit-profile-btn');
    if (editButton) {
        editButton.addEventListener('click', function() {
            showMessage('Funcionalidade "Editar Perfil" não implementada.', 'error');
        });
    }

    const emailButton = document.getElementById('email-btn');
    const emailText = document.getElementById('email-text');
    
    if (emailButton && emailText) {
        emailButton.addEventListener('click', function() {
            const email = emailText.textContent;
            
            const tempInput = document.createElement('textarea');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            
            try {
                document.execCommand('copy');
                showMessage('Email copiado para a área de transferência!');
            } catch (err) {
                console.error('Falha ao copiar email: ', err);
                showMessage('Não foi possível copiar o email.', 'error');
            }
            
            document.body.removeChild(tempInput);
        });
    }
}); 