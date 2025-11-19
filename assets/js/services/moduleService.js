import { API_URL } from "./api.js";

export async function fetchModule(moduleId) {
    const url = API_URL + `/modules/${moduleId}`;
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Erro ao buscar módulo', res.status);
    }
    return res.json()
}


export const fetchAllModules =  async () => {
    const url = API_URL + `/modules`;
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error('Erro ao buscar os módulos', res.status)
    }
    return res.json();
}