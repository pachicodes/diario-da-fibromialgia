import PainTracker from './components/painTracker.js';
import FatigueTracker from './components/fatigueTracker.js';
import { getEntries, saveEntry } from './services/dataService.js';

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

    const form = document.getElementById('registroForm');
    const lista = document.getElementById('registrosLista');

    if (form && lista) {
        function getEntryDateValue(entry) {
            if (!entry?.data) {
                return '';
            }

            if (entry.data.includes('T')) {
                return entry.data.split('T')[0];
            }

            return entry.data;
        }

        function getEntryTimeValue(entry) {
            if (entry?.hora) {
                return entry.hora;
            }

            if (entry?.data && entry.data.includes('T')) {
                return entry.data.split('T')[1].slice(0, 5);
            }

            return '';
        }

        function formatEntryDate(entry) {
            const dateValue = getEntryDateValue(entry);

            if (!dateValue) {
                return 'Data não informada';
            }

            const parsedDate = new Date(`${dateValue}T00:00:00`);

            if (Number.isNaN(parsedDate.getTime())) {
                return dateValue;
            }

            const formattedDate = parsedDate.toLocaleDateString('pt-BR');
            const formattedTime = getEntryTimeValue(entry);

            return formattedTime ? `${formattedDate} às ${formattedTime}` : formattedDate;
        }

        function carregarRegistros() {
            lista.innerHTML = '';

            const registros = getEntries().slice().reverse();

            if (registros.length === 0) {
                const emptyItem = document.createElement('li');
                emptyItem.className = 'empty-state';
                emptyItem.textContent = 'Nenhum registro ainda.';
                lista.appendChild(emptyItem);
                return;
            }

            registros.forEach((registro) => {
                const item = document.createElement('li');
                item.className = 'record';

                const strong = document.createElement('strong');
                strong.textContent = formatEntryDate(registro);

                const metrics = document.createElement('p');
                metrics.textContent = `Dor: ${registro.dor} | Fadiga: ${registro.fadiga}`;

                item.appendChild(strong);
                item.appendChild(document.createElement('br'));
                item.appendChild(metrics);

                const notes = (registro.anotacoes || registro.notas || '').trim();
                if (notes) {
                    const notesEl = document.createElement('em');
                    notesEl.textContent = notes;
                    item.appendChild(notesEl);
                }

                lista.appendChild(item);
            });
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const registro = {
                data: form.data.value,
                hora: form.hora.value || '',
                dor: form.dor.value,
                fadiga: form.fadiga.value,
                anotacoes: form.anotacoes.value.trim()
            };

            try {
                saveEntry(registro);
                form.reset();
                carregarRegistros();
            } catch (erro) {
                console.error('Erro ao salvar registro:', erro);
                alert('Erro ao salvar registro. Veja o console para detalhes.');
            }
        });

        carregarRegistros();
    }
});