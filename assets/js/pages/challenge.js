    import { fetchChallenge } from "../services/challengeService.js"
    
    const API_URL = 'http://localhost:8080/api';
    
    const challengeId = 3
    
    const form = document.getElementById('submitForm');
    const input = document.getElementById('submitInput');
    const button = document.getElementById('submitButton');
    const feedback = document.getElementById('submitFeedback');

    const challengeTitle = document.getElementById('challengeTitle');
    const challengeCategory = document.getElementById('challengeCategory');
    const instructions = document.getElementById('instructions');
    const difficulty = document.getElementById('difficulty');
    const category = document.getElementById('category');
    const reward = document.getElementById('reward');
    const challengeDetails = document.getElementById('challenge-details');



    try {
        const challengeData = await fetchChallenge(challengeId)
    
    
        challengeTitle.innerText = `Desafio: ${challengeData.title}`;
        challengeCategory.innerText = challengeData.category
        category.innerText = challengeData.category
        instructions.innerText = challengeData.description
        difficulty.innerText = challengeData.difficulty
        reward.innerText = `${challengeData.reward} pontos`

        
       

    } catch {
        challengeTitle.innerText = "Desafio não encontrado"
        challengeCategory.innerText = ""
        category.innerText = "Desafio não encontrado"
        difficulty.innerText = "Desafio não encontrado"
        instructions.innerText = "Desafio não encontrado"
        reward.innerText = "Desafio não encontrado"

        form.style.display = 'none'
        challengeDetails.style.display = 'none'
    }



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






