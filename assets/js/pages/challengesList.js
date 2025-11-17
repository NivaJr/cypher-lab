import { fetchAllChallenges } from "../services/challengeService.js";

const challengesList = document.getElementById("listContainer");


fetchAllChallenges()
.then(challenges => {

    challenges.forEach(challenge =>  
    {

        for (let i= 0; i < 5; i++) {
            challengesList.innerHTML += `
                
            <div class="card">
<div class="statusIndicator" id="statusIndicator">Done</div>
                    <div class="titleContent">
                        <p class="cardTitle" id="cardTitle">${challenge.id}. ${challenge.title}</p>
                        <p class="cardDiff" id="cardDiff">${challenge.difficulty}</p>
                    </div>
                    <p class="cardCategory" id="cardCategory">${challenge.category}</p>
                    <p class="cardReward" id="cardReward">${challenge.reward}</p>
                    <p class="cardAction" id="cardAction">Done</p>
            </div>
            `;
        }
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



