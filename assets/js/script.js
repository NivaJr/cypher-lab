document.addEventListener('DOMContentLoaded', () => {


    function exibirMensagem(formulario, texto, tipo) {
        const msgExistente = formulario.querySelector('.status-message');
        if (msgExistente) {
            msgExistente.remove();
        }

        const msgDiv = document.createElement('div');
        msgDiv.textContent = texto;
        msgDiv.className = `status-message ${tipo}`;
        
        const primeiroInput = formulario.querySelector('.input-box') || formulario.querySelector('button');
        formulario.insertBefore(msgDiv, primeiroInput);
    }


    const eyeIcons = document.querySelectorAll('.eye-icon');
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.parentElement.querySelector('input');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('bx-hide', 'bx-show');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    const registerForm = document.getElementById('register-form');
    const termsLink = document.querySelector('.terms-box a');
    const modal = document.getElementById('terms-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const acceptBtn = document.getElementById('btn-accept-terms');
    const termosCheckbox = document.getElementById('checkbox');

    if (modal) {
        if (termsLink) {
            termsLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        }

        const fecharModal = () => { modal.style.display = 'none'; };

        if (closeModalBtn) closeModalBtn.addEventListener('click', fecharModal);
        window.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });

        if (acceptBtn) {
            acceptBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                if (termosCheckbox) termosCheckbox.checked = true;
                fecharModal();
            });
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (termosCheckbox && !termosCheckbox.checked) {
                exibirMensagem(registerForm, "Você deve aceitar os Termos de Serviço.", "error");
                return;
            }

            const username = document.getElementById("username").value;
            const email = document.getElementById("email-cadastro").value;
            const senha = document.getElementById("senha-cadastro").value;
            const confirmSenha = document.getElementById("confirm-password").value;

            if (senha !== confirmSenha) {
                exibirMensagem(registerForm, "As senhas não conferem.", "error");
                return;
            }

            const dadosUsuario = {
                username: username,
                email: email,
                password: senha 
            };

            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosUsuario)
                });

                if (response.ok) {
                    const textoSucesso = await response.text(); // Ou response.json() dependendo do backend
                    exibirMensagem(registerForm, "Conta criada com sucesso! Redirecionando...", "success");
                    
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 2000);
                } else {
                    const textoErro = await response.text();
                    try {
                        const jsonErro = JSON.parse(textoErro);
                        exibirMensagem(registerForm, jsonErro.message || "Erro ao cadastrar.", "error");
                    } catch {
                        exibirMensagem(registerForm, textoErro || "Erro ao cadastrar.", "error");
                    }
                }
            } catch (error) {
                console.error("Erro de rede:", error);
                exibirMensagem(registerForm, "Erro de conexão com o servidor.", "error");
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    const rememberMeCheckbox = document.getElementById("remember-me");
    const emailLoginInput = document.getElementById("email-login");

    if (loginForm && emailLoginInput && localStorage.getItem("rememberedEmail")) {
        emailLoginInput.value = localStorage.getItem("rememberedEmail");
        if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById("email-login").value;
            const senha = document.getElementById("senha-login").value;

            if (!email || !senha) {
                exibirMensagem(loginForm, "Preencha todos os campos.", "error");
                return;
            }

            const loginDTO = {
                email: email,
                password: senha 
            };

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginDTO)
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                        localStorage.setItem("rememberedEmail", email);
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }

                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("userData", JSON.stringify({
                        email: data.email,
                        id: data.userId,
                        username: data.username 
                    }));

                    exibirMensagem(loginForm, "Login realizado! Redirecionando...", "success");
                    
                    setTimeout(() => {
                        window.location.href = "../../dashboard.html";
                    }, 1000);

                } else {
                    const textoErro = await response.text();
                    exibirMensagem(loginForm, "Credenciais inválidas ou erro no servidor.", "error");
                }
            } catch (error) {
                console.error("Erro no login:", error);
                exibirMensagem(loginForm, "Falha na conexão. Tente novamente.", "error");
            }
        });
    }
});