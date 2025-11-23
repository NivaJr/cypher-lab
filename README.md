# 🔐 CypherLab - Frontend

<div align="center">
  <img src="images/app-icon.png" alt="CypherLab Logo" width="120"/>
  <p><strong>Plataforma educacional gamificada para aprendizado de cibersegurança</strong></p>
  
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
</div>

---

## 📋 Sobre o Projeto

O **CypherLab** é uma plataforma web interativa desenvolvida para o ensino prático de cibersegurança. Através de desafios gamificados organizados em módulos temáticos, os usuários podem aprender e testar suas habilidades em um ambiente seguro e didático.

### 🎯 Objetivo

Oferecer uma experiência de aprendizado hands-on em cibersegurança, com foco em criptografia e técnicas de segurança da informação, substituindo o aprendizado puramente teórico por desafios práticos e interativos.

### 💡 Filosofia Técnica

Este projeto foi desenvolvido intencionalmente **sem o uso de frameworks** (como React, Vue ou Angular) e **sem bibliotecas de utilitários CSS** (como Tailwind ou Bootstrap).

**Objetivo pedagógico:** Aprimorar o domínio sobre os fundamentos do desenvolvimento Web (DOM manipulation, Fetch API, CSS Grid/Flexbox, ES6 Modules), construindo uma arquitetura modular e escalável utilizando apenas tecnologias nativas ("Vanilla JS"). Esta abordagem permite um entendimento profundo dos conceitos fundamentais e maior controle sobre o código.

---

## ✨ Funcionalidades

### 👤 Autenticação e Usuários
- ✅ Sistema de login e cadastro
- ✅ Proteção de rotas (usuários autenticados)
- ✅ Níveis de acesso (usuário comum e admin)
- ✅ Perfil de usuário com estatísticas

### 📊 Dashboard
- ✅ Visualização de pontuação total
- ✅ Progresso de desafios concluídos
- ✅ Sistema de streak (dias consecutivos)
- ✅ Posição no ranking geral
- ✅ Progresso por módulo

### 🎮 Desafios
- ✅ Módulos temáticos de criptografia
- ✅ Níveis de dificuldade (Fácil, Médio, Difícil)
- ✅ Sistema de pontuação por desafio
- ✅ Feedback imediato de respostas
- ✅ Histórico de tentativas

### 🏆 Ranking
- ✅ Ranking global de usuários
- ✅ Sistema de badges (ouro, prata, bronze)
- ✅ Visualização de pontuações

### ⚙️ Painel Administrativo
- ✅ Gerenciamento de módulos
- ✅ CRUD de desafios
- ✅ Proteção de rotas admin
- ✅ Interface intuitiva de administração

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Lógica e interatividade
- **Modules ES6** - Organização modular do código
- **Fetch API** - Comunicação com backend
- **LocalStorage** - Gerenciamento de sessão

---

## 📁 Estrutura do Projeto

```
cypher-lab-front/
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components/        # Estilos de componentes
│   │   └── pages/             # Estilos por página
│   └── js/
│       ├── components/        # Componentes reutilizáveis
│       ├── constants/         # Constantes e configurações
│       ├── pages/             # Lógica por página
│       └── services/          # Serviços (API, auth, etc)
│           ├── api.js         # Configuração de API e fetchWithAuth
│           ├── routeGuard.js  # Proteção de rotas
│           ├── challengeService.js
│           ├── moduleService.js
│           └── progressService.js
├── components/
│   ├── header.html           # Header usuário
│   └── headerAdmin.html      # Header admin
├── images/
│   └── app-icon.png          # Logo e favicon
├── pages/
│   ├── auth/
│   │   ├── login.html
│   │   └── cadastro.html
│   ├── admin/
│   │   ├── challengeAdmin.html
│   │   └── challengeModuleAdmin.html
│   ├── dashboard.html
│   ├── challenge.html
│   ├── challengesList.html
│   ├── rankings.html
│   └── user.html
├── index.html                # Página de redirecionamento
└── README.md
```

---

## 🚀 Como Executar

> ⚠️ **Importante:** Como o projeto utiliza ES6 Modules (`import`/`export`), você **não pode abrir** o arquivo `index.html` diretamente pelo sistema de arquivos (`file://`). É necessário usar um servidor HTTP local para que os módulos funcionem corretamente.

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Servidor web local (Live Server, http-server, etc)
- Backend do CypherLab rodando (veja repositório do backend)

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/NivaJr/cypher-lab-front.git
cd cypher-lab-front
```

2. **Configure a URL da API:**

Edite o arquivo `assets/js/services/api.js`:
```javascript
const BACKEND_HOST = 'localhost'; // ou IP do servidor
const BACKEND_PORT = '8081';      // porta do backend
```

3. **Inicie um servidor local:**

**Opção 1: Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique direito em `index.html` → "Open with Live Server"

**Opção 2: http-server (Node.js)**
```bash
npx http-server -p 3000
```

**Opção 3: Python**
```bash
python -m http.server 3000
```

4. **Acesse a aplicação:**
```
http://localhost:3000
```

---

## 🔐 Sistema de Autenticação

### Proteção de Rotas

O sistema possui três níveis de proteção:

#### 1. **Rotas Públicas (Guest)**
- `/pages/auth/login.html` - Login
- `/pages/auth/cadastro.html` - Cadastro
- Redireciona para dashboard se já autenticado

#### 2. **Rotas Autenticadas**
- `/pages/dashboard.html` - Dashboard
- `/pages/challenge.html` - Desafio individual
- `/pages/challengesList.html` - Lista de desafios
- `/pages/rankings.html` - Rankings
- `/pages/user.html` - Perfil
- Redireciona para login se não autenticado

#### 3. **Rotas Administrativas**
- `/pages/admin/challengeModuleAdmin.html` - Gerenciar módulos
- `/pages/admin/challengeAdmin.html` - Gerenciar desafios
- Requer autenticação + role ADMIN
- Redireciona para dashboard se não for admin

### Token JWT

Todas as requisições à API incluem automaticamente o token JWT:

```javascript
import { fetchWithAuth } from './services/api.js';

// Requisição com token automático
const response = await fetchWithAuth('/api/user/progress');
```

---

## 🎨 Características Visuais

- Design moderno e responsivo
- Tema escuro com gradientes roxos/violetas
- Feedback visual imediato
- Animações suaves
- Interface intuitiva
- Cards informativos
- Badges e indicadores de progresso

### 🖼️ Identidade Visual

O design foi prototipado no Figma antes da implementação, focando em:
- **Acessibilidade:** Alto contraste e navegação clara
- **Imersão:** Tema "Dark Mode/Hacker" para experiência gamificada
- **Consistência:** Sistema de design coeso em todas as páginas
- **Responsividade:** Adaptação para diferentes tamanhos de tela

#### 📸 Screenshots

<div align="center">
  
**Login**
  
![Login](images/docs/login.png)

**Dashboard**

![Dashboard](images/docs/dashboard.png)

**Lista de Desafios**

![Challenge List](images/docs/challengeList.png)

**Desafio Individual**

![Challenge](images/docs/challenge6.png)

**Ranking**

![Ranking](images/docs/ranking.png)

**Perfil do Usuário**

![Perfil](images/docs/perfil.png)

</div>

---

## 🔗 Repositórios Relacionados

- **Frontend:** [github.com/NivaJr/cypher-lab-front](https://github.com/NivaJr/cypher-lab-front)
- **Backend:** [github.com/alisson94/cypher-lab](https://github.com/alisson94/cypher-lab)

---

## 📝 Funcionalidades Futuras

- [ ] Sistema de hints progressivos
- [ ] sModo escuro/claro
- [ ] Conquistas e troféus
- [ ] Exportação de relatórios de progresso
- [ ] Sistema de times/grupos
- [ ] Desafios colaborativos

---

## 👥 Contribuidores

- **[NivaJr](https://github.com/NivaJr)** - FullStack Developer
- **[lfmineiro](https://github.com/lfmineiro)** - FullStack Developer
- **[alisson94](https://github.com/alisson94)** - FullStack Developer

---

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através dos repositórios do GitHub.

---

<div align="center">
  <p>Feito com 💜 pela equipe CypherLab</p>
  <p>© 2025 CypherLab - Todos os direitos reservados</p>
</div>

