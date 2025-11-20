import { fetchAllChallenges, fetchChallenge, fetchChallengesByModule } from "../services/challengeService.js";
import { fetchUserChallenges, fetchUserChallengesByModule } from "../services/progressService.js";

const challengesList = document.getElementById("listContainer");

const params = new URLSearchParams(window.location.search);
const moduleId = parseInt(params.get('moduleId'))
const userId = JSON.parse(localStorage.getItem("userData")).id;

    const fetchPromise = moduleId ? fetchUserChallengesByModule(userId, moduleId) : fetchUserChallenges(userId);

    fetchPromise
    .then(challenges => {
    
        challenges.forEach(challenge =>  
        {
                challengesList.innerHTML += `
                <div class="card">
                <div class="statusIndicator" >${challenge.isSolved ? '✔️' : '❌'}</div>
                <div class="titleContent">
                <p class="cardTitle">${challenge.id}. ${challenge.title}</p>
                <p class="cardDiff">${challenge.difficulty}</p>
                </div>
                        <p class="cardCategory">${challenge.category}</p>
                        <p class="cardReward">${challenge.reward} pontos</p>
                        <button class="cardAction" data-challenge-id="${challenge.id}">Iniciar ></button>
                        </div>
                        `;
                        

challengesList.addEventListener('click', (event) => {
            const button = event.target.closest('.cardAction');
            if (!button) return;
            const { challengeId } = button.dataset;
            window.location.href = `../../../pages/challenge.html?challengeId=${challengeId}`;
        });
        })
        
        const cardDiff = document.querySelectorAll('.cardDiff');
        cardDiff.forEach( diff => {
            if (diff.innerText === 'Fácil') {
                diff.style.backgroundColor = '#36d3993d';
                diff.style.color = '#36D399';
            } else if (diff.innerText === 'Médio') {
                diff.style.backgroundColor = '#fbbd2340';
                diff.style.color = '#FBBF24';
            } else if (diff.innerText === 'Difícil') {
                diff.style.backgroundColor = '#f8727238';
                diff.style.color = '#F87272';
            }
        })
    
    })
    
    .catch(error => console.log('tá dando ruim', error))




