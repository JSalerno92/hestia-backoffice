import { getServices } from '../../api/servicesApi.js';
import { renderAvailabilityTable } from './availabilityTable.js';
import { openGenerateModal } from './availabilityGenerateModal.js';

export async function renderAvailabilityPage(container) {

    container.innerHTML = `
        <div class="page-header">
        <h1>Disponibilidad</h1>
        <button id="generateSlotsBtn" class="primary">
            Generar slots
        </button>
        </div>

        <div id="availabilityTable"></div>
    `;

    const services = await getServices();

    renderAvailabilityTable(
        document.getElementById('availabilityTable')
    );

    document
        .getElementById('generateSlotsBtn')
        .addEventListener('click', () => {
        openGenerateModal(services);
        });
}