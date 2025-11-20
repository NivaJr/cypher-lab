import { API_URL } from "../services/api.js";
import { fetchChallenge } from "../services/challengeService.js"
    

const params = new URLSearchParams(window.location.search);
const challengeId = parseInt(params.get('challengeId') || '1', 10);
const userId = JSON.parse(localStorage.getItem("userData")).id;

    
    
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
        const modal = document.getElementById("modalCorrect");
        const modalClose = document.getElementById("closeModal")
        const continueBtn = document.getElementById("continueButton")
        if(loader) loader.remove();
        challengeContent.classList.add('loaded');
        
        form.addEventListener('submit', async (e) => {
            
            e.preventDefault();
            const userAnswer = input.value.trim()
            console.log(userAnswer)
            
            const res = await fetch(`${API_URL}/user/${userId}/challenges/${challengeId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: userAnswer
                })
            });
            
            
            const data = await res.json();
            feedback.innerText = data.message;
            feedback.style.color = data.isCorrect ? 'green' : 'red';
modal.style.display = data.isCorrect ? "flex" : "none";
        modalClose.addEventListener('click', () => {
            modal.style.display = "none";
        })

        continueBtn.addEventListener('click', () => {
            window.location.href = "../../pages/dashboard.html";
        })
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
        
    
        
        

        
       










