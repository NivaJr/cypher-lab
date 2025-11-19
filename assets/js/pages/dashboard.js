import { fetchAllChallenges } from "../services/challengeService.js";
import { fetchUserProgress, fetchUserSolvedProgress, fetchUserRank, fetchAllModulesProgress, fetchUserStreak } from "../services/progressService.js";

// modulos estaticos

let idUser = 1; // substituir pela lógica de autenticação real

const modulesData = await fetchAllModulesProgress(idUser);

// const modulesData = [
//     {
//         id: 1,
//         title: "Criptografia Básica",
//         description: "10 desafios",
//         icon: "🔐",
//         status: "completed",
//         progress: 100,
//         totalChallenges: 10
//     },
//     {
//         id: 2,
//         title: "Análise de Vulnerabilidades",
//         description: "12 desafios",
//         icon: "🔍",
//         status: "inProgress",
//         progress: 60,
//         totalChallenges: 12
//     },
//     {
//         id: 3,
//         title: "Engenharia Social",
//         description: "8 desafios",
//         icon: "👥",
//         status: "inProgress",
//         progress: 30,
//         totalChallenges: 8
//     },
//     {
//         id: 4,
//         title: "Forense Digital",
//         description: "15 desafios",
//         icon: "💻",
//         status: "locked",
//         progress: 0,
//         totalChallenges: 15
//     },
//     {
//         id: 5,
//         title: "Penetration Testing",
//         description: "18 desafios",
//         icon: "⚡",
//         status: "locked",
//         progress: 0,
//         totalChallenges: 18
//     },
//     {
//         id: 6,
//         title: "Malware Analysis",
//         description: "14 desafios",
//         icon: "🦠",
//         status: "locked",
//         progress: 0,
//         totalChallenges: 14
//     },
//     {
//         id: 7,
//         title: "Network Security",
//         description: "11 desafios",
//         icon: "🌐",
//         status: "completed",
//         progress: 100,
//         totalChallenges: 11
//     },
//     {
//         id: 8,
//         title: "Web Application Security",
//         description: "13 desafios",
//         icon: "🔒",
//         status: "inProgress",
//         progress: 75,
//         totalChallenges: 13
//     }
// ];

const modulesContainer = document.getElementById("modulesContainer");

function getStatusText(status) {
    const statusMap = {
        'completed': 'Concluído',
        'inProgress': 'Em Andamento',
        'notStarted': 'Não Iniciado',
    };
    return statusMap[status] || status;
}

function getButtonConfig(status) {
    if (status === 'completed') {
        return { text: 'Revisar', class: 'secondary', disabled: false };
    } else if (status === 'inProgress') {
        return { text: 'Continuar', class: 'primary', disabled: false };
    } else {
        return { text: 'Começar', class: 'secondary', disabled: false };
    }
}

function renderModules() {
    modulesContainer.innerHTML = '';
    
    modulesData.forEach(module => {
        console.log(module);


        const button = getButtonConfig(module.status);
        
        modulesContainer.innerHTML += `
            <div class="moduleCard">
                <div class="moduleHeader">
                    <span class="moduleIcon">${module.icon}</span>
                    <span class="moduleStatus ${module.status}">${getStatusText(module.status)}</span>
                </div>
                <h3 class="moduleTitle">${module.moduleTitle}</h3>
                <p class="moduleSubtitle">${module.totalChallenges} desafios</p>
                <div class="moduleProgress">
                    <div class="moduleProgressText">
                        <span>Progresso</span>
                        <span>${module.completionPercentage}%</span>
                    </div>
                    <div class="moduleProgressBar">
                        <div class="moduleProgressFill" style="width: ${module.completionPercentage}%"></div>
                    </div>
                </div>
                <button 
                    class="moduleButton ${button.class}" 
                    ${button.disabled ? 'disabled' : ''}
                    onclick="window.location.href='challengesList.html?module=${module.moduleId}'"
                >
                    ${button.text}
                </button>
            </div>
        `;
    });
}

function updateStats() {
    
    const completed = modulesData.filter(m => m.status === 'completed').length;
    const inProgress = modulesData.filter(m => m.status === 'inProgress').length;
    const notStarted = modulesData.filter(m => m.status === 'notStarted').length;
    

    const totalProgress = modulesData.reduce((sum, m) => sum + (m.status === 'completed' ? 1 : 0), 0);
    const overallProgress = Math.round(totalProgress / modulesData.length);
    

    document.getElementById('modulesCompleted').textContent = completed;
    document.getElementById('modulesInProgress').textContent = inProgress;
    document.getElementById('modulesNotStarted').textContent = notStarted;
    document.getElementById('overallProgress').textContent = `${overallProgress}% Concluído`;
    document.getElementById('progressFill').style.width = `${overallProgress}%`;
}

const challenges = await fetchAllChallenges();
fetchUserSolvedProgress(idUser)
    .then(progress => {
        console.log(progress);

        if(progress){

            const totalChallenges = challenges.length;
            const completedChallenges = progress.length;
            const progressPercentage = Math.round((completedChallenges / totalChallenges) * 100);
            
            const pointsEarned = progress.reduce((sum, challenge) => sum + challenge.pointsEarned, 0);

            document.getElementById('totalPoints').textContent = pointsEarned;
            document.getElementById('completedChallenges').textContent = completedChallenges;
            document.getElementById('progressText').textContent = `${progressPercentage}% de progresso`;
            document.getElementById('totalPointsBottom').textContent = pointsEarned;
        }
    })
    .catch(error => {
        console.log('Erro ao carregar desafios:', error);
    });

fetchUserRank(idUser)
    .then(rankData => {
        console.log(rankData);
        if(rankData){  
            document.querySelector('h2#ranking').textContent = `#${rankData.rank}`;
        }
    })

renderModules();
updateStats();