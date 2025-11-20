import { fetchAllModules } from "../services/moduleService.js";
import { createModule, updateModule, deleteModule } from "../services/moduleService.js";

let modules = [];
let currentEditingId = null;

// elementos do DOM
const modulesGrid = document.getElementById("modulesGrid");
const btnNewModule = document.getElementById("btnNewModule");
const moduleFormContainer = document.getElementById("moduleFormContainer");
const moduleForm = document.getElementById("moduleForm");
const formTitle = document.getElementById("formTitle");
const btnCloseForm = document.getElementById("btnCloseForm");
const btnCancelForm = document.getElementById("btnCancelForm");
const messageBox = document.getElementById("messageBox");
const confirmModal = document.getElementById("confirmModal");
const btnCancelDelete = document.getElementById("btnCancelDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");

let moduleToDelete = null;

// inicialização
async function init() {
    try {
        await loadModules();
        setupEventListeners();
    } catch (error) {
        console.error("Erro ao inicializar página:", error);
        showMessage("Erro ao carregar módulos", "error");
    }
}

// carregar módulos
async function loadModules() {
    try {
        modules = await fetchAllModules();
        renderModules();
    } catch (error) {
        console.error("Erro ao carregar módulos:", error);
        showMessage("Erro ao carregar módulos", "error");
    }
}

// renderizar módulos
function renderModules() {
    if (!modules || modules.length === 0) {
        modulesGrid.innerHTML = `
            <div class="emptyState">
                <span class="emptyIcon">📦</span>
                <p>Nenhum módulo encontrado</p>
                <p class="emptySubtext">Comece criando seu primeiro módulo</p>
            </div>
        `;
        return;
    }

    modulesGrid.innerHTML = modules.map(module => `
        <div class="moduleCard" data-id="${module.id}">
            <div class="moduleCardHeader">
                <h3 class="moduleCardTitle">${module.title}</h3>
                <div class="moduleActions">
                    <button class="btnIcon btnEdit" data-id="${module.id}" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                    <button class="btnIcon btnDelete" data-id="${module.id}" title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="moduleCardInfo">
                <span class="moduleId">ID: ${module.id}</span>
            </div>
            <button class="btnViewChallenges" data-id="${module.id}">
                Ver Desafios →
            </button>
        </div>
    `).join("");

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

    document.querySelectorAll(".btnViewChallenges").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            window.location.href = `challengeAdmin.html?moduleId=${id}`;
        });
    });
}

// setup event listeners
function setupEventListeners() {
    btnNewModule.addEventListener("click", openNewForm);
    btnCloseForm.addEventListener("click", closeForm);
    btnCancelForm.addEventListener("click", closeForm);
    moduleForm.addEventListener("submit", handleSubmit);
    btnCancelDelete.addEventListener("click", closeDeleteModal);
    btnConfirmDelete.addEventListener("click", handleDelete);
}

// abrir formulário de novo módulo
function openNewForm() {
    currentEditingId = null;
    formTitle.textContent = "Novo Módulo";
    moduleForm.reset();
    moduleFormContainer.classList.remove("hidden");
    document.getElementById("moduleTitle").focus();
}

// abrir formulário de edição
function openEditForm(id) {
    const module = modules.find(m => m.id === id);
    if (!module) return;

    currentEditingId = id;
    formTitle.textContent = "Editar Módulo";
    document.getElementById("moduleTitle").value = module.title;
    moduleFormContainer.classList.remove("hidden");
    document.getElementById("moduleTitle").focus();
}

// fechar formulário
function closeForm() {
    moduleFormContainer.classList.add("hidden");
    moduleForm.reset();
    currentEditingId = null;
}

// handle submit do formulário
async function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById("moduleTitle").value.trim();
    
    if (!title) {
        showMessage("Por favor, preencha o título do módulo", "error");
        return;
    }

    try {
        if (currentEditingId) {
            // atualizar módulo existente
            await updateModule(currentEditingId, { title });
            showMessage("Módulo atualizado com sucesso!", "success");
        } else {
            // criar novo módulo
            await createModule({ title });
            showMessage("Módulo criado com sucesso!", "success");
        }
        
        closeForm();
        await loadModules();
    } catch (error) {
        console.error("Erro ao salvar módulo:", error);
        showMessage("Erro ao salvar módulo", "error");
    }
}

// abrir modal de confirmação de exclusão
function openDeleteConfirmation(id) {
    moduleToDelete = id;
    confirmModal.classList.remove("hidden");
}

// fechar modal de confirmação
function closeDeleteModal() {
    confirmModal.classList.add("hidden");
    moduleToDelete = null;
}

// handle delete
async function handleDelete() {
    if (!moduleToDelete) return;

    try {
        await deleteModule(moduleToDelete);
        showMessage("Módulo excluído com sucesso!", "success");
        closeDeleteModal();
        await loadModules();
    } catch (error) {
        console.error("Erro ao excluir módulo:", error);
        showMessage("Erro ao excluir módulo", "error");
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