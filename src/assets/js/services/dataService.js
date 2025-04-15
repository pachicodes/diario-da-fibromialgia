// Serviço para gerenciamento de dados do diário de fibromialgia
const STORAGE_KEY = 'fibromyalgiaDiary';

/**
 * Salva uma nova entrada no diário
 * @param {Object} entry - Os dados do registro (data, dor, fadiga, anotações)
 */
export function saveEntry(entry) {
    const entries = getEntries();
    
    // Adiciona um ID único ao registro (timestamp)
    const newEntry = {
        id: Date.now().toString(),
        ...entry,
        createdAt: new Date().toISOString()
    };
    
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
}

/**
 * Obtém todas as entradas do diário
 * @returns {Array} Array de registros
 */
export function getEntries() {
    const entries = localStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
}

/**
 * Limpa todas as entradas do diário
 */
export function clearEntries() {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Edita um registro existente
 * @param {string} id - ID do registro a ser editado
 * @param {Object} updatedData - Novos dados para o registro
 * @returns {boolean} - Retorna true se o registro foi encontrado e atualizado
 */
export function editEntry(id, updatedData) {
    const entries = getEntries();
    const index = entries.findIndex(entry => entry.id === id);
    
    if (index !== -1) {
        // Mantém os dados originais que não foram atualizados e adiciona os novos
        entries[index] = {
            ...entries[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        return true;
    }
    
    return false;
}

/**
 * Exclui um registro
 * @param {string} id - ID do registro a ser excluído
 * @returns {boolean} - Retorna true se o registro foi encontrado e excluído
 */
export function deleteEntry(id) {
    const entries = getEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    
    if (filteredEntries.length < entries.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
        return true;
    }
    
    return false;
}

/**
 * Obtém um registro específico pelo ID
 * @param {string} id - ID do registro a ser obtido
 * @returns {Object|null} - O registro ou null se não for encontrado
 */
export function getEntryById(id) {
    const entries = getEntries();
    return entries.find(entry => entry.id === id) || null;
}