// filepath: /gerenciando-fibromialgia/gerenciando-fibromialgia/src/assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const painTracker = new PainTracker();
    const fatigueTracker = new FatigueTracker();

    const painInput = document.getElementById('pain-level');
    const fatigueInput = document.getElementById('fatigue-level');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', () => {
        const painLevel = parseInt(painInput.value);
        const fatigueLevel = parseInt(fatigueInput.value);

        if (painLevel >= 1 && painLevel <= 10 && fatigueLevel >= 1 && fatigueLevel <= 10) {
            painTracker.recordPain(painLevel);
            fatigueTracker.recordFatigue(fatigueLevel);
            alert('Registro salvo com sucesso!');
        } else {
            alert('Por favor, insira níveis de dor e fadiga entre 1 e 10.');
        }
    });
});