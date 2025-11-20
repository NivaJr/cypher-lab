import { API_URL } from "../services/api.js";

const rankingsTableBody = document.getElementById('rankingsTableBody');

// Função para buscar rankings do backend
async function fetchRankings() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_URL}/user/ranking`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar rankings');
        }

        const rankings = await response.json();
        return rankings;
    } catch (error) {
        console.error('Erro ao buscar rankings:', error);
        return [];
    }
}

// Função para obter as iniciais do email
function getEmailInitials(email) {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
}

// Função para obter a classe de badge da posição
function getPositionBadgeClass(position) {
    if (position === 1) return 'gold';
    if (position === 2) return 'silver';
    if (position === 3) return 'bronze';
    return 'default';
}

// Função para renderizar os rankings
function renderRankings(rankings) {
    rankingsTableBody.innerHTML = '';

    if (rankings.length === 0) {
        rankingsTableBody.innerHTML = `
            <div class="emptyState">
                <div class="emptyIcon">📊</div>
                <p>Nenhum ranking disponível no momento</p>
            </div>
        `;
        return;
    }

    rankings.forEach(user => {
        const badgeClass = getPositionBadgeClass(user.posicao);
        const initials = getEmailInitials(user.email);

        const row = document.createElement('div');
        row.className = 'rankingRow';
        row.innerHTML = `
            <div class="rankingPosition">
                <div class="positionBadge ${badgeClass}">
                    ${user.posicao}
                </div>
            </div>
            <div class="rankingUser">
                <div class="userAvatar">${initials}</div>
                <span class="userEmail">${user.email}</span>
            </div>
            <div class="rankingPoints">
                <span class="pointsBadge">${user.pontos} pts</span>
            </div>
        `;

        rankingsTableBody.appendChild(row);
    });
}

// Função para mostrar loading
function showLoading() {
    rankingsTableBody.innerHTML = `
        <div class="loadingState">
            <div class="spinner"></div>
            <p>Carregando rankings...</p>
        </div>
    `;
}

// Inicializar página
async function init() {
    showLoading();
    const rankings = await fetchRankings();
    renderRankings(rankings);
}

init();