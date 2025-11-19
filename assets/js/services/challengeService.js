import { API_URL } from "./api.js";

export async function fetchChallenge(challengeId) {
    const url = API_URL + `/challenges/${challengeId}`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar desafio', res.status);
    }
    return res.json()
}


export const fetchAllChallenges =  async () => {
    const url = API_URL + `/challenges`;
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('Erro ao buscar is desafios', res.status)
    }
    return res.json();
}

export const fetchChallengesByModule = async (moduleId) => {
    const url = API_URL + `/module/${moduleId}/challenges`;
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('Erro ao buscar os desafios do módulo', res.status)
    }   
    return res.json();
}