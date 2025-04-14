import PainTracker from './components/painTracker.js';
import FatigueTracker from './components/fatigueTracker.js';

document.addEventListener('DOMContentLoaded', () => {
    const painTracker = new PainTracker();
    const fatigueTracker = new FatigueTracker();

    const painInput = document.getElementById('pain-level');
    const fatigueInput = document.getElementById('fatigue-level');
    const submitButton = document.getElementById('submit-button');

    if (painInput && fatigueInput && submitButton) {
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
    }

    // Novo app simplificado para registro e exibição dos dados
    const form = document.getElementById('registroForm');
    const lista = document.getElementById('registrosLista');

    function carregarRegistros() {
        try {
            const registros = JSON.parse(localStorage.getItem('fibroRegistros') || '[]');
            console.log('Registros carregados:', registros);
            lista.innerHTML = '';
            if (registros.length === 0) {
                lista.innerHTML = '<li>Nenhum registro ainda.</li>';
                return;
            }
            registros.reverse().forEach(registro => {
                const li = document.createElement('li');
                li.className = 'record';
                li.innerHTML = `<strong>${new Date(registro.data).toLocaleString('pt-BR')}</strong><br>
                    Dor: <b>${registro.dor}</b> | Fadiga: <b>${registro.fadiga}</b><br>
                    <em>${registro.anotacoes ? registro.anotacoes : ''}</em>`;
                lista.appendChild(li);
            });
        } catch (erro) {
            console.error('Erro ao carregar registros:', erro);
            alert('Erro ao carregar registros. Veja o console para detalhes.');
        }
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        // Monta a data/hora combinando os campos
        let dataHora;
        if (form.hora.value) {
            dataHora = form.data.value + 'T' + form.hora.value;
        } else {
            dataHora = form.data.value;
        }
        const registro = {
            data: dataHora,
            dor: form.dor.value,
            fadiga: form.fadiga.value,
            anotacoes: form.anotacoes.value.trim()
        };
        try {
            const registros = JSON.parse(localStorage.getItem('fibroRegistros') || '[]');
            registros.push(registro);
            localStorage.setItem('fibroRegistros', JSON.stringify(registros));
            console.log('Registro salvo:', registro);
            form.reset();
            carregarRegistros();
        } catch (erro) {
            console.error('Erro ao salvar registro:', erro);
            alert('Erro ao salvar registro. Veja o console para detalhes.');
        }
    };

    carregarRegistros();
});