import { deleteWelcomeMessage, toggleWelcomeMessageActive, setDefaultWelcomeMessage } from '../../api/welcomeMessageApi.js';

import { openWelcomeMessageModal } from "./welcomeMessageModal.js";

export function renderWelcomeMessagesTable(container, messages){

  const rows = messages.map(message => `

    <tr>

      <td>${message.title}</td>
      <td>${message.message}</td>
      <td>${message.duration_ms}</td>
      <td>${message.priority}</td>
      <td>${message.is_active ? 'Active' : 'Inactive'}</td>
      <td>${message.is_default ? 'Default' : ''}</td>

      <td>

        <button class="btn btn-edit" data-edit="${message.id}">
          Edit
        </button>

        <button class="btn btn-toggle" data-toggle="${message.id}">
          ${message.is_active ? 'Disable' : 'Enable'}
        </button>

        <button class="btn btn-default" data-default="${message.id}">
          Set Default
        </button>

        <button class="btn btn-delete" data-delete="${message.id}">
          Delete
        </button>

      </td>

    </tr>

  `).join('');

  container.innerHTML = `

    <table class="table">

      <thead>
        <tr>
          <th>Title</th>
          <th>Message</th>
          <th>Duration</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Default</th>
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
    const message = messages.find(m => m.id == id);

    btn.onclick = () => openWelcomeMessageModal(message);

  });

  container.querySelectorAll('[data-toggle]').forEach(btn => {

    const id = btn.dataset.toggle;

    btn.onclick = async () => {

      await toggleWelcomeMessageActive(id);

      location.reload();

    };

  });

  container.querySelectorAll('[data-default]').forEach(btn => {

    const id = btn.dataset.default;

    btn.onclick = async () => {

      await setDefaultWelcomeMessage(id);

      location.reload();

    };

  });

  container.querySelectorAll('[data-delete]').forEach(btn => {

    const id = btn.dataset.delete;

    btn.onclick = async () => {

      if (!confirm('Delete welcome message?')) return;

      await deleteWelcomeMessage(id);

      location.reload();

    };

  });

}