import { API_URL } from "./api"


export async function fetchChallenge(challengeId) {
    const res = await fetch(`${API_URL}/challenges/${challengeId}`)
    if (!res.ok) {
        throw new Error('Erro ao buscar desafio')
    }
    return res.json()
}