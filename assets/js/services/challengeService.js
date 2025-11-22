import { API_URL, fetchWithAuth } from "./api.js";

export async function fetchChallenge(challengeId) {
    const url = API_URL + `/challenges/${challengeId}`;
    const res = await fetchWithAuth(url);
    if (!res.ok) {
        throw new Error('Erro ao buscar desafio', res.status);
    }
    return res.json()
}


export const fetchAllChallenges =  async () => {
    const url = API_URL + `/challenges`;
    const res = await fetchWithAuth(url);
    if(!res.ok) {
        throw new Error('Erro ao buscar is desafios', res.status)
    }
    return res.json();
}

export const fetchChallengesByModule = async (moduleId) => {
    const url = API_URL + `/module/${moduleId}/challenges`;
    const res = await fetchWithAuth(url);
    if(!res.ok) {
        throw new Error('Erro ao buscar os desafios do módulo', res.status)
    }   
    return res.json();
}

// Funções administrativas

export async function createChallenge(challengeData) {
    const url = API_URL + `/admin/challenge`;
    
    const res = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(challengeData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao criar desafio', res.status);
    }
    return res.json();
}

export async function updateChallenge(challengeId, challengeData) {
    const url = API_URL + `/admin/challenge/${challengeId}`;
    
    const res = await fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(challengeData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao atualizar desafio', res.status);
    }
    return res.json();
}

export async function deleteChallenge(challengeId) {
    const url = API_URL + `/admin/challenge/${challengeId}`;
    
    const res = await fetchWithAuth(url, {
        method: 'DELETE'
    });
    
    if (!res.ok) {
        throw new Error('Erro ao excluir desafio', res.status);
    }
    return res.ok;
}