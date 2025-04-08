class PainTracker {
    constructor() {
        this.painLevels = [];
    }

    recordPainLevel(level) {
        if (level < 1 || level > 10) {
            throw new Error("O nível de dor deve estar entre 1 e 10.");
        }
        const timestamp = new Date().toISOString();
        this.painLevels.push({ level, timestamp });
        this.saveToLocalStorage();
    }

    getPainLevels() {
        return this.painLevels;
    }

    saveToLocalStorage() {
        localStorage.setItem('painLevels', JSON.stringify(this.painLevels));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('painLevels');
        if (data) {
            this.painLevels = JSON.parse(data);
        }
    }
}

export default PainTracker;