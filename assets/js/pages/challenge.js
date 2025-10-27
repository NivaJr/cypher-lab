    API_URL = 'http://localhost:8080/api';

    const form = document.getElementById('submitForm');
    const input = document.getElementById('submitInput');
    const button = document.getElementById('submitButton');

    form.addEventListener('submit', async (e) => {
        
        e.preventDefault();
        const userAnswer = input.value.trim()
        console.log(userAnswer)
        
        const res = await fetch(`${API_URL}/challenges/${challengeId}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ans: userAnswer
            })
        } )
        
            
    })





