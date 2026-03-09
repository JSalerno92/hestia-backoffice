import { deleteService } from "../../api/servicesApi";
import { openServiceModal } from "./servicesFormModal";

export function renderServicesTable(container, services){

    const rows = services.map(service => `

        <tr>

            <td>${service.id}</td>
            <td>${service.code}</td>
            <td>${service.name}</td>
            <td>${service.duration_minutes || '-'}</td>
            <td>${service.active ? 'Active' : 'Inactive'}</td>

            <td>

                <button class="btn btn-edit" data-edit="${service.id}">
                    Edit
                </button>

                <button class="btn btn-delete" data-delete="${service.id}">
                    Delete
                </button>

            </td>

        </tr>

        `).join('');

        container.innerHTML = `

        <table class="table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Duración (minutos)</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    `;

    container.querySelectorAll('[data-edit]').forEach(btn => {

        const id = btn.dataset.edit;

        const service = services.find(s => s.id == id);

        btn.onclick = () => openServiceModal(service);

    });

    container.querySelectorAll('[data-delete]').forEach(btn => {

        const id = btn.dataset.delete;

        btn.onclick = async () => {

            if (!confirm('Delete service?')) return;

            await deleteService(id);

            location.reload();

        };

    });

}