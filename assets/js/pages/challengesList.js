import { fetchAllChallenges } from "../services/challengeService.js";

const challengesList = document.getElementById("listContainer");


fetchAllChallenges()
.then(challenges => {

    challenges.forEach(challenge =>  
    {
        challengesList.innerHTML += `
                <div class="card">
                    <p class="cardTitle" id="cardTitle">${challenge.id}. ${challenge.title}</p>
                    <p class="cardDiff" id="cardDiff">${challenge.difficulty}</p>
                    <p class="statusCard" id="statusCard">${challenge.category}</p>
                </div>
        `        
    })
})
.catch(error => console.log('tá dando ruim', error))



