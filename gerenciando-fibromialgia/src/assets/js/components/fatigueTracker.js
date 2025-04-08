class FatigueTracker {
    constructor() {
        this.fatigueLevel = null;
    }

    setFatigueLevel(level) {
        if (level < 1 || level > 10) {
            throw new Error("O nível de fadiga deve estar entre 1 e 10.");
        }
        this.fatigueLevel = level;
        this.saveFatigueLevel();
    }

    getFatigueLevel() {
        return this.fatigueLevel;
    }

    saveFatigueLevel() {
        const currentDate = new Date().toISOString().split('T')[0];
        const fatigueData = {
            date: currentDate,
            level: this.fatigueLevel
        };
        localStorage.setItem(`fatigue_${currentDate}`, JSON.stringify(fatigueData));
    }

    loadFatigueLevel(date) {
        const data = localStorage.getItem(`fatigue_${date}`);
        if (data) {
            this.fatigueLevel = JSON.parse(data).level;
        }
    }
}

export default FatigueTracker;