    import { API_URL, fetchChallenge } from "../services/challengeService.js"
    

    const challengeId = 1
    
    
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

        challengeTitle.innerHTML = challengeData.title;
        challengeCategory.innerText = challengeData.category;
        instructions.innerHTML = challengeData.description; 
        difficulty.innerText = challengeData.difficulty
        category.innerText = challengeData.category
        reward.innerText = `${challengeData.reward} pontos`
        const form = document.getElementById('submitForm');
        const input = document.getElementById('submitInput');
        const button = document.getElementById('submitButton');
        const feedback = document.getElementById('submitFeedback')
        
        const loader = document.querySelector('.loading')
        if(loader) loader.remove();
        challengeContent.classList.add('loaded');
        
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
        })
        .catch( error => {
            const loader = document.querySelector('.loading')
            if(loader) loader.remove();
            challengeContent.classList.add('loaded');
            
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
        
    
        
        

        
       










