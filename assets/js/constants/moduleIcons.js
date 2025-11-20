// Lista de ícones para módulos de cibersegurança
export const MODULE_ICONS = [
    { id: 0, emoji: '🔐', name: 'Cadeado' },
    { id: 1, emoji: '🔍', name: 'Lupa' },
    { id: 2, emoji: '👥', name: 'Pessoas' },
    { id: 3, emoji: '💻', name: 'Laptop' },
    { id: 4, emoji: '⚡', name: 'Raio' },
    { id: 5, emoji: '🦠', name: 'Vírus' },
    { id: 6, emoji: '🌐', name: 'Mundo' },
    { id: 7, emoji: '🔒', name: 'Cadeado Chave' },
    { id: 8, emoji: '🛡️', name: 'Escudo' },
    { id: 9, emoji: '👾', name: 'Alien' },
    { id: 10, emoji: '🔑', name: 'Chave' },
    { id: 11, emoji: '📊', name: 'Gráfico' },
    { id: 12, emoji: '🧪', name: 'Teste' },
    { id: 13, emoji: '🚨', name: 'Alerta' },
    { id: 14, emoji: '🔥', name: 'Fogo' },
    { id: 15, emoji: '🎯', name: 'Alvo' }
];

// Função auxiliar para obter emoji por ID
export function getIconById(iconId) {
    const icon = MODULE_ICONS.find(i => i.id === iconId);
    return icon ? icon.emoji : '📦';
}
