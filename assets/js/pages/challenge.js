    API_URL = 'http://localhost:8080/api';

    const form = document.getElementById('submitForm');
    const input = document.getElementById('submitInput');
    const button = document.getElementById('submitButton');
    const feedback = document.getElementById('submitFeedback');

    form.addEventListener('submit', async (e) => {
        
        e.preventDefault();
        const userAnswer = input.value.trim()
        const challengeId = 3
        
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
        
            
    })





