import { previewAvailability, generateAvailability } from "../../api/availabilityApi";

export function openGenerateModal(services) {

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal">

        <h2>Generar disponibilidad</h2>

        <form class="backoffice-form" id="availabilityForm">

            <div class="backoffice-group">
                <label>Servicio</label>
                <select name="service_id" required>
                ${services.map(s => `
                    <option value="${s.id}">
                    ${s.name}
                    </option>
                `).join('')}
                </select>
            </div>

            <div class="backoffice-group">
                <label>Fecha inicio</label>
                <input type="date" name="start_date" required>
            </div>

            <div class="backoffice-group">
                <label>Fecha fin</label>
                <input type="date" name="end_date" required>
            </div>

            <div class="backoffice-group days">
                <label>Días</label>
                <div class="days">
                ${['Lun','Mar','Mie','Jue','Vie','Sab']
                    .map((d,i)=>`
                    <label>
                        <input type="checkbox" value="${i}" name="days_of_week">
                        ${d}
                    </label>
                    `).join('')
                }
                </div>
            </div>

            <div class="backoffice-group">
                <label>Hora inicio</label>
                <input type="time" name="start_time" required>
            </div>

            <div class="backoffice-group">
                <label>Hora fin</label>
                <input type="time" name="end_time" required>
            </div>

            <div class="backoffice-group">
                <label>Capacidad a agregar</label>
                <input type="number" name="capacity_to_add" value="1" min="1" required>
            </div>

            <div class="backoffice-group">
                <button type="button" id="previewBtn">
                    Previsualización
                </button>

                <div id="previewResult"></div>
            </div>

            
            <div class="backoffice-group">
                <label>
                Escriba <b>GENERAR</b> para confirmar
                </label>

                <input type="text" name="confirmation">
            </div>

            <div class="modal-actions">
                <button class="cancel-btn">
                    Cancelar
                </button>
                <button class="submit-btn" type="submit">
                    Generar
                </button>
            </div>

        </form>

        </div>
    `;

    document.body.appendChild(modal);

    const form = modal.querySelector('#availabilityForm');
    const previewBtn = modal.querySelector('#previewBtn');
    const previewBox = modal.querySelector('#previewResult');
    const cancelBtn = modal.querySelector('.cancel-btn');

    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });

    previewBtn.addEventListener('click', async () => {

        const formData = new FormData(form);

        const payload = {
        service_id: Number(formData.get('service_id')),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        days_of_week: formData.getAll('days_of_week').map(Number),
        start_time: formData.get('start_time'),
        end_time: formData.get('end_time'),
        capacity_to_add: Number(formData.get('capacity_to_add'))
        };

        const result = await previewAvailability(payload);

        previewBox.innerHTML = `
        <div class="preview-box">
            <p>Total slots: ${result.summary.total_slots}</p>
            <p>Nuevos: ${result.summary.new_slots}</p>
            <p>Existentes: ${result.summary.existing_slots}</p>
        </div>
        `;
    });

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const formData = new FormData(form);

        if (formData.get('confirmation') !== 'GENERAR') {
        alert('Debe escribir GENERAR para confirmar');
        return;
        }

        const payload = {
        service_id: Number(formData.get('service_id')),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        days_of_week: formData.getAll('days_of_week').map(Number),
        start_time: formData.get('start_time'),
        end_time: formData.get('end_time'),
        capacity_to_add: Number(formData.get('capacity_to_add')),
        confirmed: true
        };

        const result = await generateAvailability(payload);

        alert(`Slots procesados: ${result.total_slots_processed}`);

        modal.remove();

    });

}