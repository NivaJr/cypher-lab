import { API_URL, fetchWithAuth } from "./api.js";

export async function fetchModule(moduleId) {
    const url = API_URL + `/module/${moduleId}`;
    const res = await fetchWithAuth(url);
    if (!res.ok) {
        throw new Error('Erro ao buscar módulo', res.status);
    }
    return res.json()
}


export const fetchAllModules =  async () => {
    const url = API_URL + `/modules`;
    const res = await fetchWithAuth(url);
    if(!res.ok) {
        throw new Error('Erro ao buscar os módulos', res.status)
    }
    return res.json();
}

// Funções administrativas

export async function createModule(moduleData) {
    const url = API_URL + `/admin/module`;
    
    const res = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(moduleData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao criar módulo', res.status);
    }
    return res.json();
}

export async function updateModule(moduleId, moduleData) {
    const url = API_URL + `/admin/module/${moduleId}`;
    console.log(moduleData);
    
    const res = await fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(moduleData)
    });
    
    if (!res.ok) {
        throw new Error('Erro ao atualizar módulo', res.status);
    }
    return res.json();
}

export async function deleteModule(moduleId) {
    const url = API_URL + `/admin/module/${moduleId}`;
    
    const res = await fetchWithAuth(url, {
        method: 'DELETE'
    });
    
    if (!res.ok) {
        throw new Error('Erro ao excluir módulo', res.status);
    }
    return res.ok;
}