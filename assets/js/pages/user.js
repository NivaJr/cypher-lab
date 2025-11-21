import { fetchUserProgress } from "../services/progressService.js";

// Obter dados do usuário do localStorage
const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData?.id;

// Elementos do DOM
const userNameEl = document.getElementById('userName');
const userEmailEl = document.getElementById('userEmail');
const userAvatarEl = document.getElementById('userAvatar');
const totalPointsEl = document.getElementById('totalPoints');
const completedChallengesEl = document.getElementById('completedChallenges');
const totalAttemptsEl = document.getElementById('totalAttempts');
const successRateEl = document.getElementById('successRate');
const progressContainer = document.getElementById('progressContainer');

// Função para obter iniciais do email
function getEmailInitials(email) {
    if (!email) return 'U';
    const name = email.split('@')[0];
    if (name.length === 1) return name.toUpperCase();
    return name.substring(0, 2).toUpperCase();
}

// Função para formatar data LocalDateTime do Java
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return 'N/A';
    try {
        // LocalDateTime vem no formato: "2024-01-15T14:30:00"
        const date = new Date(dateTimeString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} min atrás`;
        if (diffHours < 24) return `${diffHours}h atrás`;
        if (diffDays === 1) return '1 dia atrás';
        if (diffDays < 7) return `${diffDays} dias atrás`;
        
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    } catch (e) {
        return dateTimeString;
    }
}

// Função para obter classe de dificuldade
function getDifficultyClass(difficulty) {
    const difficultyLower = difficulty?.toLowerCase();
    if (difficultyLower === 'easy' || difficultyLower === 'fácil') return 'easy';
    if (difficultyLower === 'medium' || difficultyLower === 'médio') return 'medium';
    if (difficultyLower === 'hard' || difficultyLower === 'difícil') return 'hard';
    return 'medium';
}

// Função para traduzir dificuldade
function translateDifficulty(difficulty) {
    const map = {
        'easy': 'Fácil',
        'medium': 'Médio',
        'hard': 'Difícil'
    };
    return map[difficulty?.toLowerCase()] || difficulty;
}

// Função para renderizar progresso
function renderProgress(progressList) {
    progressContainer.innerHTML = '';

    if (!progressList || progressList.length === 0) {
        progressContainer.innerHTML = `
            <div class="emptyState">
                <div class="emptyIcon">📊</div>
                <p>Nenhum progresso registrado ainda</p>
            </div>
        `;
        return;
    }

    progressList.forEach(item => {
        const difficultyClass = getDifficultyClass(item.challengeDifficulty);
        const difficultyText = translateDifficulty(item.challengeDifficulty);
        const statusClass = item.solved ? 'solved' : 'notSolved';
        const statusText = item.solved ? '✅ Resolvido' : '⏳ Não Resolvido';

        const progressItem = document.createElement('div');
        progressItem.className = 'progressItem';
        progressItem.innerHTML = `
            <div class="progressHeader">
                <div class="progressTitle">
                    <h3 class="challengeTitle">${item.challengeTitle}</h3>
                    <span class="challengeDifficulty ${difficultyClass}">${difficultyText}</span>
                </div>
                <div class="progressStatus">
                    <span class="statusBadge ${statusClass}">${statusText}</span>
                </div>
            </div>
            <div class="progressDetails">
                <div class="detailItem">
                    <span class="detailLabel">Tentativas</span>
                    <span class="detailValue">${item.attempts}</span>
                </div>
                <div class="detailItem">
                    <span class="detailLabel">Pontos Ganhos</span>
                    <span class="detailValue points">${item.pointsEarned} pts</span>
                </div>
                <div class="detailItem">
                    <span class="detailLabel">${item.solved ? 'Resolvido em' : 'Última Tentativa'}</span>
                    <span class="detailValue date">${formatDateTime(item.solved ? item.solvedAt : item.lastAttemptAt)}</span>
                </div>
            </div>
        `;

        progressContainer.appendChild(progressItem);
    });
}

// Função para calcular estatísticas
function calculateStats(progressList) {
    if (!progressList || progressList.length === 0) {
        return {
            totalPoints: 0,
            completedChallenges: 0,
            totalAttempts: 0,
            successRate: 0
        };
    }

    const totalPoints = progressList.reduce((sum, item) => sum + (item.pointsEarned || 0), 0);
    const completedChallenges = progressList.filter(item => item.solved).length;
    const totalAttempts = progressList.reduce((sum, item) => sum + (item.attempts || 0), 0);
    const successRate = totalAttempts > 0 
        ? Math.round((completedChallenges / progressList.length) * 100) 
        : 0;

    return {
        totalPoints,
        completedChallenges,
        totalAttempts,
        successRate
    };
}

// Função para mostrar loading
function showLoading() {
    progressContainer.innerHTML = `
        <div class="loadingState">
            <div class="spinner"></div>
            <p>Carregando progresso...</p>
        </div>
    `;
}

// Função para inicializar página
async function init() {
    // Exibir dados do usuário
    if (userData) {
        userNameEl.textContent = userData.name || userData.email;
        userEmailEl.textContent = userData.email;
        userAvatarEl.textContent = getEmailInitials(userData.email);
    }

    // Verificar se tem userId
    if (!userId) {
        console.error('Usuário não autenticado');
        progressContainer.innerHTML = `
            <div class="emptyState">
                <div class="emptyIcon">🔒</div>
                <p>Você precisa fazer login para ver seu progresso</p>
            </div>
        `;
        return;
    }

    // Buscar progresso do backend
    showLoading();
    try {
        const progressList = await fetchUserProgress(userId);
        const stats = calculateStats(progressList);

        // Atualizar estatísticas
        totalPointsEl.textContent = stats.totalPoints;
        completedChallengesEl.textContent = stats.completedChallenges;
        totalAttemptsEl.textContent = stats.totalAttempts;
        successRateEl.textContent = `${stats.successRate}%`;

        // Renderizar progresso
        renderProgress(progressList);
    } catch (error) {
        console.error('Erro ao buscar progresso:', error);
        progressContainer.innerHTML = `
            <div class="emptyState">
                <div class="emptyIcon">❌</div>
                <p>Erro ao carregar progresso</p>
            </div>
        `;
    }
}

init();