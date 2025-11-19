import { fetchAllChallenges } from "../services/challengeService.js";

// modulos estaticos
const modulesData = [
    {
        id: 1,
        title: "Criptografia Básica",
        description: "10 desafios",
        icon: "🔐",
        status: "completed",
        progress: 100,
        totalChallenges: 10
    },
    {
        id: 2,
        title: "Análise de Vulnerabilidades",
        description: "12 desafios",
        icon: "🔍",
        status: "inProgress",
        progress: 60,
        totalChallenges: 12
    },
    {
        id: 3,
        title: "Engenharia Social",
        description: "8 desafios",
        icon: "👥",
        status: "inProgress",
        progress: 30,
        totalChallenges: 8
    },
    {
        id: 4,
        title: "Forense Digital",
        description: "15 desafios",
        icon: "💻",
        status: "locked",
        progress: 0,
        totalChallenges: 15
    },
    {
        id: 5,
        title: "Penetration Testing",
        description: "18 desafios",
        icon: "⚡",
        status: "locked",
        progress: 0,
        totalChallenges: 18
    },
    {
        id: 6,
        title: "Malware Analysis",
        description: "14 desafios",
        icon: "🦠",
        status: "locked",
        progress: 0,
        totalChallenges: 14
    },
    {
        id: 7,
        title: "Network Security",
        description: "11 desafios",
        icon: "🌐",
        status: "completed",
        progress: 100,
        totalChallenges: 11
    },
    {
        id: 8,
        title: "Web Application Security",
        description: "13 desafios",
        icon: "🔒",
        status: "inProgress",
        progress: 75,
        totalChallenges: 13
    }
];

const modulesContainer = document.getElementById("modulesContainer");

function getStatusText(status) {
    const statusMap = {
        'completed': 'Concluído',
        'inProgress': 'Em Andamento',
        'locked': 'Bloqueado'
    };
    return statusMap[status] || status;
}

function getButtonConfig(status) {
    if (status === 'completed') {
        return { text: 'Revisar', class: 'secondary', disabled: false };
    } else if (status === 'inProgress') {
        return { text: 'Continuar', class: 'primary', disabled: false };
    } else {
        return { text: 'Bloqueado', class: 'secondary', disabled: true };
    }
}

function renderModules() {
    modulesContainer.innerHTML = '';
    
    modulesData.forEach(module => {
        const button = getButtonConfig(module.status);
        
        modulesContainer.innerHTML += `
            <div class="moduleCard">
                <div class="moduleHeader">
                    <span class="moduleIcon">${module.icon}</span>
                    <span class="moduleStatus ${module.status}">${getStatusText(module.status)}</span>
                </div>
                <h3 class="moduleTitle">${module.title}</h3>
                <p class="moduleSubtitle">${module.description}</p>
                <div class="moduleProgress">
                    <div class="moduleProgressText">
                        <span>Progresso</span>
                        <span>${module.progress}%</span>
                    </div>
                    <div class="moduleProgressBar">
                        <div class="moduleProgressFill" style="width: ${module.progress}%"></div>
                    </div>
                </div>
                <button 
                    class="moduleButton ${button.class}" 
                    ${button.disabled ? 'disabled' : ''}
                    onclick="window.location.href='challengesList.html?module=${module.id}'"
                >
                    ${button.text}
                </button>
            </div>
        `;
    });
}

function updateStats() {
    // Calcula estatísticas dos módulos
    const completed = modulesData.filter(m => m.status === 'completed').length;
    const inProgress = modulesData.filter(m => m.status === 'inProgress').length;
    const locked = modulesData.filter(m => m.status === 'locked').length;
    
    // Calcula progresso geral
    const totalProgress = modulesData.reduce((sum, m) => sum + m.progress, 0);
    const overallProgress = Math.round(totalProgress / modulesData.length);
    
    // Atualiza DOM
    document.getElementById('modulesCompleted').textContent = completed;
    document.getElementById('modulesInProgress').textContent = inProgress;
    document.getElementById('modulesBlocked').textContent = locked;
    document.getElementById('overallProgress').textContent = `${overallProgress}% Concluído`;
    document.getElementById('progressFill').style.width = `${overallProgress}%`;
}

// Carrega os desafios da API para estatísticas
fetchAllChallenges()
    .then(challenges => {
        const totalChallenges = challenges.length;
        const completedChallenges = 45; // Mock - substituir por lógica real
        const progressPercentage = Math.round((completedChallenges / totalChallenges) * 100);
        
        document.getElementById('totalPoints').textContent = '2847';
        document.getElementById('completedChallenges').textContent = completedChallenges;
        document.getElementById('progressText').textContent = `${progressPercentage}% de progresso`;
        document.getElementById('totalPointsBottom').textContent = '2847';
    })
    .catch(error => {
        console.log('Erro ao carregar desafios:', error);
    });

renderModules();
updateStats();