import { API_URL } from "./api.js";

export async function fetchUserProgress(userId) {
    const url = API_URL + `/user/${userId}/progress`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar progresso do usuário', res.status);
    }
    return res.json()
}

export async function fetchUserSolvedProgress(userId) {
    const url = API_URL + `/user/${userId}/solved`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar progresso do usuário', res.status);
    }
    return res.json()
}

export async function fetchUserStreak(userId) {
    const url = API_URL + `/user/${userId}/streak`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar streak do usuário', res.status);
    }
    return res.json()
}

export async function fetchUserRank(userId) {
    const url = API_URL + `/user/${userId}/rank`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar rank do usuário', res.status);
    }
    return res.json()
}


export const fetchAllModulesProgress =  async (userId) => {
    const url = API_URL + `/user/${userId}/modules/progress`;
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('Erro ao buscar o progresso dos módulos', res.status)
    }
    return res.json();
}