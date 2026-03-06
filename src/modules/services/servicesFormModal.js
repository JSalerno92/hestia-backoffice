import { createService, updateService } from '../../api/servicesApi.js';

export function openServiceModal(service = null) {

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `

        <div class="modal">

            <h2>${service ? 'Edit Service' : 'New Service'}</h2>

            <form class="backoffice-form" id="serviceForm">

                <label>Code</label>
                <input name="code" required value="${service?.code || ''}" />

                <label>Name</label>
                <input name="name" required value="${service?.name || ''}" />

                <label>Short Label</label>
                <input name="short_label" value="${service?.short_label || ''}" />

                <label>Description</label>
                <textarea name="description">${service?.description || ''}</textarea>

                <label>Info</label>
                <textarea name="info">${service?.info || ''}</textarea>

                <label>UI Color</label>
                <input type="color" name="ui_color" value="${service?.ui_color || '#000000'}"/>

                <label>Display Order</label>
                <input type="number" name="display_order" value="${service?.display_order || 0}" />

                <label>Duration Minutes</label>
                <input type="number" name="duration_minutes" value="${service?.duration_minutes || ''}" />

                <label>Active</label>
                <input type="checkbox" name="active" ${service?.active ? 'checked' : ''} />

                <div class="modal-actions">

                    <button class="cancel-btn" type="button" id="cancelBtn">
                        Cancel
                    </button>

                    <button class="submit-btn" type="submit">
                        Save
                    </button>

                </div>

            </form>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('cancelBtn').onclick = () => {
        overlay.remove();
    };

    document.getElementById('serviceForm').onsubmit = async (e) => {

        e.preventDefault();

        const form = new FormData(e.target);

        const payload = {
            code: form.get('code'),
            name: form.get('name'),
            short_label: form.get('short_label'),
            description: form.get('description'),
            info: form.get('info'),
            ui_color: form.get('ui_color'),
            display_order: Number(form.get('display_order')),
            duration_minutes: form.get('duration_minutes') ? Number(form.get('duration_minutes')) : null,
            active: form.get('active') === 'on'
        };

        if (service) {

            await updateService(service.id, payload);

        } else {

            await createService(payload);

        }

        location.reload();

    };

}