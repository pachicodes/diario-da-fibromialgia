// filepath: /gerenciando-fibromialgia/gerenciando-fibromialgia/src/assets/js/services/dataService.js
export function saveEntry(painLevel, fatigueLevel) {
    const entries = getEntries();
    const newEntry = {
        date: new Date().toISOString(),
        painLevel,
        fatigueLevel
    };
    entries.push(newEntry);
    localStorage.setItem('fibromyalgiaDiary', JSON.stringify(entries));
}

export function getEntries() {
    const entries = localStorage.getItem('fibromyalgiaDiary');
    return entries ? JSON.parse(entries) : [];
}

export function clearEntries() {
    localStorage.removeItem('fibromyalgiaDiary');
}