import { AUTH_URL } from "../services/api.js";

const authUrl = AUTH_URL;

document.addEventListener('DOMContentLoaded', () => {
    
    const rememberMeCheckbox = document.getElementById("remember-me");
    const emailLoginInput = document.getElementById("email-login");

    if (emailLoginInput && localStorage.getItem("rememberedEmail")) {
        emailLoginInput.value = localStorage.getItem("rememberedEmail");
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
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

    const btnCadastrar = document.getElementById("btn-cadastrar");

    if (btnCadastrar) { 
        btnCadastrar.addEventListener("click", (evento) => {
            evento.preventDefault(); 

            const username = document.getElementById("username").value; 
            const email = document.getElementById("email-cadastro").value;
            const senha = document.getElementById("senha-cadastro").value;
            const confirmSenha = document.getElementById("confirm-password").value;
            
            const termosCheckbox = document.getElementById("checkbox"); 

            if (termosCheckbox && !termosCheckbox.checked) {
                alert("Você deve aceitar os Termos de Serviço para continuar.");
                return;
            }
 
            if (senha !== confirmSenha) {
                alert("As senhas não conferem!");
                return;
            }

            const dadosUsuario = {
                username: username, 
                email: email,
                senha: senha
            };

            const opcoes = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosUsuario)
            };

            fetch(`${authUrl}/register`, opcoes)
                .then(response => {
                    console.log(opcoes);
                    if (response.ok) {
                        return response.text();
                    } else {
                        return response.text().then(texto => Promise.reject(texto)); 
                    }
                })
                .then(data => {
                    alert("Sucesso: " + data);
                    window.location.href = "login.html";
                })
                .catch(error => {
                    alert("Erro: " + error);
                });
        });
    }

    const btnLogin = document.getElementById("btn-login");

    if (btnLogin) {
        btnLogin.addEventListener("click", (evento) => {
            evento.preventDefault();

            const email = document.getElementById("email-login").value;
            const senha = document.getElementById("senha-login").value;

            if (!email || !senha) {
                alert("Preencha todos os campos!");
                return;
            }

            const loginDTO = {
                email: email,
                senha: senha
            };
            fetch(`${authUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginDTO)
            })
            .then(async response => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    const textoErro = await response.text();
                    throw new Error(textoErro);
                }
            })
            .then(data => {
                console.log("Login realizado:", data);

                if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                    localStorage.setItem("rememberedEmail", email);

                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                localStorage.setItem("authToken", data.token);
                
                localStorage.setItem("userData", JSON.stringify({
                    email: data.email,
                    id: data.userId,
                    role: data.role
                }));

                if (data.role === 'ADMIN') {
                    window.location.href = "../admin/challengeModuleAdmin.html";
                }else{
                    window.location.href = "../dashboard.html";
                }
            })
            .catch(error => {
                console.error("Erro no login:", error);
                alert("Falha no login: " + error.message);
            });
        });
    }

    const termsLink = document.querySelector('.terms-box a');
    const modal = document.getElementById('terms-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const acceptBtn = document.getElementById('btn-accept-terms');

    if (termsLink && modal) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            if (termsCheckbox) {
                termsCheckbox.checked = true;
            }
            modal.style.display = 'none';
        });
    }
    
});

document.querySelector('#login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const senha = e.target.senha.value;
  const rememberMe = !!document.getElementById('remember-me')?.checked;

  if (!email || !senha) {
    alert('Preencha email e senha');
    return;
  }

  try {
    const res = await fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // se usar cookie-based auth
      body: JSON.stringify({ email, senha })
    });

    if (!res.ok) {
      // tenta extrair mensagem do backend
      const errText = await res.text();
      throw new Error(errText || `Erro ${res.status}`);
    }

    const data = await res.json();
    // espera algo como: { token, username, email, userId, avatar?, stats?, achievements?, activity? }

    // armazena token e metadados
    if (data.token) localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify({
      username: data.username || data.name,
      email: data.email,
      id: data.userId || data.id
    }));

    // cria objeto usado pela user.html (cypher_user)
    const name = data.username || data.name || (email.split('@')[0]);
    const cypherUser = {
      name,
      handle: data.handle || ('@' + name.replace(/\s+/g, '').toLowerCase()),
      email: data.email || email,
      avatar: data.avatar || `https://placehold.co/96x96/111827/ffffff?text=${encodeURIComponent(name.slice(0,2))}`,
      memberSince: data.memberSince || new Date().toLocaleDateString('pt-BR'),
      stats: data.stats || {},
      achievements: data.achievements || [],
      activity: data.activity || []
    };
    localStorage.setItem('cypher_user', JSON.stringify(cypherUser));

    // lembrar email se checkbox marcada
    if (rememberMe) localStorage.setItem('rememberedEmail', email);
    else localStorage.removeItem('rememberedEmail');

    // redireciona (ajuste caminho conforme necessário)
    window.location.href = '../dashboard.html';
  } catch (err) {
    console.error('Erro no login:', err);
    alert('Falha no login: ' + (err.message || err));
  }
});