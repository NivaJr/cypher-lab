    import { fetchChallenge } from "../services/challengeService.js"
    
    const API_URL = 'http://localhost:8080/api';
    
    const challengeId = 3
    
    const form = document.getElementById('submitForm');
    const input = document.getElementById('submitInput');
    const button = document.getElementById('submitButton');
    const feedback = document.getElementById('submitFeedback');
    
    const challengeContent = document.querySelector('.challenge-content');
    const challengeTitle = document.getElementById('challengeTitle');
    const challengeCategory = document.getElementById('challengeCategory');
    const instructions = document.getElementById('instructions');
    const difficulty = document.getElementById('difficulty');
    const category = document.getElementById('category');
    const reward = document.getElementById('reward');
    const challengeDetails = document.getElementById('challenge-details');



  
        fetchChallenge(challengeId)
        .then(challengeData => {
            challengeContent.innerHTML = `
            <div class="challenge-title">
                <h1 id="challengeTitle">Desafio: ${challengeData.title}</h1>
                <p id="challengeCategory">${challengeData.category}</p>
            </div>
    
            <div class="challenge-box challenge-description">
                <p class="description-title">Instruções</p>
                <p class="instructions" id="instructions"> ${challengeData.description}
                </p>
                <div class="challenge-details" id="challenge-details">
                    <p class="details" id="difficulty">${challengeData.difficulty}</p>
                    <p class="details" id="category">${challengeData.category}</p>
                    <p class="details" id="reward">${challengeData.reward} pontos</p>
                </div>
            </div>
    
            <form class="challenge-box challenge-submit" id="submitForm">
                <h2>Digite sua resposta:</h2>
                <div class="challenge-submit-input">
                    <input type="text" id="submitInput" placeholder="Digite o texto cifrado aqui...">
                    <button type="submit" id="submitButton">Verificar resposta</button>
                </div>
                <div class="feedback" id="submitFeedback"></div>
            
            `
        })
        .catch( error => {
                challengeContent.innerHTML = `
                    <div class="not-found-content">
                        <h1 class="not-found-title">
                            Desafio não encontrado
                        </h1>
                        <p class="not-found-text">
                            O desafio que você procura não existe
                        </p>
                        <button class="btn">
                            Retornar para o dashboard
                        </button>
                    </div>
                `;
       } ) 
    
    
        
        
        
        {/* challengeTitle.innerText = `Desafio: ${challengeData.title}`;
        challengeCategory.innerText = challengeData.category
        category.innerText = challengeData.category
        instructions.innerText = challengeData.description
        difficulty.innerText = challengeData.difficulty
        reward.innerText = `${challengeData.reward} pontos` */}

        
       




    form.addEventListener('submit', async (e) => {
        
        e.preventDefault();
        const userAnswer = input.value.trim()
        console.log(userAnswer)
        
        const res = await fetch(`${API_URL}/challenges/${challengeId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ans: userAnswer
            })
        } )
        
        
        const data = await res.json();
        feedback.innerText = data.message;
        feedback.style.color = data.correct ? 'green' : 'red';
        
    });






