import { getServices } from '../../api/servicesApi.js';
import { renderServicesTable } from './servicesTable.js';
import { openServiceModal } from './servicesFormModal.js';

export async function renderServicesPage(container){

    container.innerHTML = `
        <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
            <h2>Servicios</h2>
            <button id="createServiceBtn">New Service</button>
        </div>

        <div id="servicesTable"></div>
    `;

    const services = await getServices();

    renderServicesTable(
        document.getElementById('servicesTable'),
        services
    );

    document
        .getElementById('createServiceBtn')
        .addEventListener('click', () => {
            openServiceModal();
        });

}