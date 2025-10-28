const API_URL = 'http://localhost:8080/api';

export async function fetchChallenge(challengeId) {
    const url = API_URL + `/challenges/${challengeId}`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar desafio', res.status);
    }
    return res.json()
}