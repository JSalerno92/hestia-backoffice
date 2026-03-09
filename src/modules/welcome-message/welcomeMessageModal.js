import { createWelcomeMessage, updateWelcomeMessage } from "../../api/welcomeMessageApi";

export function openWelcomeMessageModal(message = null) {

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `

    <div class="modal">

      <h2>${message ? 'Edit Welcome Message' : 'New Welcome Message'}</h2>

      <form class="backoffice-form" id="welcomeMessageForm">

        <label>Título</label>
        <input name="title" required value="${message?.title || ''}" />

        <label>Mensaje</label>
        <input name="message" required value="${message?.message || ''}" />

        <label>Sub mensaje</label>
        <input name="sub_message" value="${message?.sub_message || ''}" />

        <label>Duración (ms)</label>
        <input type="number" name="duration_ms" value="${message?.duration_ms || 3000}" />

        <label>Prioridad</label>
        <input type="number" name="priority" value="${message?.priority || 0}" />

        <label>Válido desde</label>
        <input type="date" name="valid_from" value="${message?.valid_from ? message.valid_from.split('T')[0] : ''}" />

        <label>Válido hasta</label>
        <input type="date" name="valid_to" value="${message?.valid_to ? message.valid_to.split('T')[0] : ''}" />

        <label>Activo</label>
        <input type="checkbox" name="is_active" ${message?.is_active ? 'checked' : ''} />

        <label>Default</label>
        <input type="checkbox" name="is_default" ${message?.is_default ? 'checked' : ''} />

        <div class="modal-actions">

          <button class="cancel-btn" type="button" id="cancelBtn">
            Cancelar
          </button>

          <button class="submit-btn" type="submit">
            Guardar
          </button>

        </div>

      </form>

    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('cancelBtn').onclick = () => {
    overlay.remove();
  };

  document.getElementById('welcomeMessageForm').onsubmit = async (e) => {

    e.preventDefault();

    const form = new FormData(e.target);

    const payload = {
      title: form.get('title'),
      message: form.get('message'),
      sub_message: form.get('sub_message'),
      duration_ms: Number(form.get('duration_ms')),
      priority: Number(form.get('priority')),
      valid_from: form.get('valid_from') || null,
      valid_to: form.get('valid_to') || null,
      is_active: form.get('is_active') === 'on',
      is_default: form.get('is_default') === 'on'
    };

    if (message) {

      await updateWelcomeMessage(message.id, payload);

    } else {

      await createWelcomeMessage(payload);

    }

    location.reload();

  };

}