import { fetchChallengesByModule } from "../services/challengeService.js";
import { createChallenge, updateChallenge, deleteChallenge } from "../services/challengeService.js";
import { fetchModule } from "../services/moduleService.js";

let challenges = [];
let currentEditingId = null;
let currentModuleId = null;

// elementos do DOM
const challengesGrid = document.getElementById("challengesGrid");
const btnNewChallenge = document.getElementById("btnNewChallenge");
const challengeFormContainer = document.getElementById("challengeFormContainer");
const challengeForm = document.getElementById("challengeForm");
const formTitle = document.getElementById("formTitle");
const btnCloseForm = document.getElementById("btnCloseForm");
const btnCancelForm = document.getElementById("btnCancelForm");
const messageBox = document.getElementById("messageBox");
const confirmModal = document.getElementById("confirmModal");
const btnCancelDelete = document.getElementById("btnCancelDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const btnBack = document.getElementById("btnBack");
const moduleName = document.getElementById("moduleName");

let challengeToDelete = null;

// inicialização
async function init() {
    // pegar moduleId da URL
    const urlParams = new URLSearchParams(window.location.search);
    currentModuleId = urlParams.get('moduleId');

    if (!currentModuleId) {
        showMessage("ID do módulo não encontrado", "error");
        setTimeout(() => {
            window.location.href = 'challengeModuleAdmin.html';
        }, 2000);
        return;
    }

    try {
        await loadModuleInfo();
        await loadChallenges();
        setupEventListeners();
    } catch (error) {
        console.error("Erro ao inicializar página:", error);
        showMessage("Erro ao carregar desafios", "error");
    }
}

// carregar informações do módulo
async function loadModuleInfo() {
    try {
        const module = await fetchModule(currentModuleId);
        moduleName.textContent = module.title;
    } catch (error) {
        console.error("Erro ao carregar módulo:", error);
        moduleName.textContent = "Módulo desconhecido";
    }
}

// carregar desafios
async function loadChallenges() {
    try {
        challenges = await fetchChallengesByModule(currentModuleId);
        renderChallenges();
    } catch (error) {
        console.error("Erro ao carregar desafios:", error);
        showMessage("Erro ao carregar desafios", "error");
    }
}

// renderizar desafios
function renderChallenges() {
    if (!challenges || challenges.length === 0) {
        challengesGrid.innerHTML = `
            <div class="emptyState">
                <span class="emptyIcon">📝</span>
                <p>Nenhum desafio encontrado</p>
                <p class="emptySubtext">Comece criando seu primeiro desafio</p>
            </div>
        `;
        return;
    }

    challengesGrid.innerHTML = challenges.map(challenge => {
        const difficultyMap = {
            'EASY': { text: 'Fácil', class: 'easy' },
            'MEDIUM': { text: 'Médio', class: 'medium' },
            'HARD': { text: 'Difícil', class: 'hard' }
        };
        const difficulty = difficultyMap[challenge.difficulty] || { text: challenge.difficulty, class: 'medium' };
        
        return `
        <div class="challengeCard" data-id="${challenge.id}">
            <div class="challengeCardHeader">
                <h3 class="challengeCardTitle">${challenge.title}</h3>
                <div class="challengeActions">
                    <button class="btnIcon btnEdit" data-id="${challenge.id}" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    <button class="btnIcon btnDelete" data-id="${challenge.id}" title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="challengeCardBody">
                <p class="challengeDescription">${challenge.description || 'Sem descrição'}</p>
            </div>
            <div class="challengeCardInfo">
                <div class="challengeInfoRow">
                    <span class="challengeBadge difficulty ${difficulty.class}">${difficulty.text}</span>
                    <span class="challengeBadge reward">🏆 ${challenge.reward} pts</span>
                </div>
                <span class="challengeId">ID: ${challenge.id}</span>
            </div>
        </div>
        `;
    }).join("");

    // adicionar event listeners aos botões
    document.querySelectorAll(".btnEdit").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openEditForm(id);
        });
    });

    document.querySelectorAll(".btnDelete").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openDeleteConfirmation(id);
        });
    });
}

// setup event listeners
function setupEventListeners() {
    btnNewChallenge.addEventListener("click", openNewForm);
    btnCloseForm.addEventListener("click", closeForm);
    btnCancelForm.addEventListener("click", closeForm);
    challengeForm.addEventListener("submit", handleSubmit);
    btnCancelDelete.addEventListener("click", closeDeleteModal);
    btnConfirmDelete.addEventListener("click", handleDelete);
    btnBack.addEventListener("click", () => {
        window.location.href = 'challengeModuleAdmin.html';
    });
}

// abrir formulário de novo desafio
function openNewForm() {
    currentEditingId = null;
    formTitle.textContent = "Novo Desafio";
    challengeForm.reset();
    challengeFormContainer.classList.remove("hidden");
    document.getElementById("challengeTitle").focus();
}

// abrir formulário de edição
function openEditForm(id) {
    const challenge = challenges.find(c => c.id === id);
    if (!challenge) return;

    currentEditingId = id;
    formTitle.textContent = "Editar Desafio";
    document.getElementById("challengeTitle").value = challenge.title;
    document.getElementById("challengeDescription").value = challenge.description || '';
    document.getElementById("challengeDifficulty").value = challenge.difficulty || '';
    document.getElementById("challengeSolutionHash").value = challenge.solutionHash || '';
    document.getElementById("challengeReward").value = challenge.reward || '';
    challengeFormContainer.classList.remove("hidden");
    document.getElementById("challengeTitle").focus();
}

// fechar formulário
function closeForm() {
    challengeFormContainer.classList.add("hidden");
    challengeForm.reset();
    currentEditingId = null;
}

// handle submit do formulário
async function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById("challengeTitle").value.trim();
    const description = document.getElementById("challengeDescription").value.trim();
    const difficulty = document.getElementById("challengeDifficulty").value;
    const solutionHash = document.getElementById("challengeSolutionHash").value.trim();
    const reward = parseInt(document.getElementById("challengeReward").value);
    
    if (!title || !description || !difficulty || !solutionHash || !reward) {
        showMessage("Por favor, preencha todos os campos obrigatórios", "error");
        return;
    }

    const challengeData = {
        title,
        description,
        difficulty,
        solutionHash,
        reward,
        categoryId: parseInt(currentModuleId)
    };

    try {
        if (currentEditingId) {
            // atualizar desafio existente
            await updateChallenge(currentEditingId, challengeData);
            showMessage("Desafio atualizado com sucesso!", "success");
        } else {
            // criar novo desafio
            await createChallenge(challengeData);
            showMessage("Desafio criado com sucesso!", "success");
        }
        
        closeForm();
        await loadChallenges();
    } catch (error) {
        console.error("Erro ao salvar desafio:", error);
        showMessage("Erro ao salvar desafio", "error");
    }
}

// abrir modal de confirmação de exclusão
function openDeleteConfirmation(id) {
    challengeToDelete = id;
    confirmModal.classList.remove("hidden");
}

// fechar modal de confirmação
function closeDeleteModal() {
    confirmModal.classList.add("hidden");
    challengeToDelete = null;
}

// handle delete
async function handleDelete() {
    if (!challengeToDelete) return;

    try {
        await deleteChallenge(challengeToDelete);
        showMessage("Desafio excluído com sucesso!", "success");
        closeDeleteModal();
        await loadChallenges();
    } catch (error) {
        console.error("Erro ao excluir desafio:", error);
        showMessage("Erro ao excluir desafio", "error");
    }
}

// mostrar mensagem
function showMessage(text, type = "success") {
    messageBox.textContent = text;
    messageBox.className = `messageBox ${type}`;
    messageBox.classList.remove("hidden");
    
    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}

// inicializar quando o DOM estiver pronto
init();
