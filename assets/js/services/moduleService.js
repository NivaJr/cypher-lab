import { API_URL } from "./api.js";
import { getToken } from "./api.js";

export async function fetchModule(moduleId) {
    const url = API_URL + `/module/${moduleId}`;
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

// Funções administrativas

export async function createModule(moduleData) {
    const token = getToken();
    const url = API_URL + `/admin/module`;
    
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(moduleData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao criar módulo', res.status);
    }
    return res.json();
}

export async function updateModule(moduleId, moduleData) {
    const url = API_URL + `/admin/module/${moduleId}`;
    const token = getToken();
    console.log(moduleData);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(moduleData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao atualizar módulo', res.status);
    }
    return res.json();
}

export async function deleteModule(moduleId) {
    const url = API_URL + `/admin/module/${moduleId}`;
    const token = getToken();
    
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!res.ok) {
        throw new Error('Erro ao excluir módulo', res.status);
    }
    return res.ok;
}