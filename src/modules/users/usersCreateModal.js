import { createUser } from '../../api/usersApi.js';
import { renderUsersTable } from './usersTable.js';

export function openCreateUserModal() {

  const modal = document.createElement('div');

  modal.className = 'modal-overlay';

  modal.innerHTML = `
    <div class="modal">

      <h2>Crear usuario</h2>

      <form id="create-user-form" class="backoffice-form">

        <div class="backoffice-group">
          <label>Email</label>
          <input type="email" name="email" required>
        </div>

        <div class="backoffice-group">
          <label>Password</label>
          <input type="password" name="password" required>
        </div>

        <div class="backoffice-group">
          <label>Rol</label>
          <select name="role">
            <option value="admin">admin</option>
            <option value="editor">editor</option>
          </select>
        </div>

        <div class="backoffice-group btn">
          <button type="submit" class="submit-btn">
            Crear usuario
          </button>
        </div>

      </form>

      <button class="cancel-btn">Cancelar</button>

    </div>
  `;

  document.body.appendChild(modal);

  attachEvents(modal);

}

function attachEvents(modal) {

  modal
    .querySelector('.cancel-btn')
    .addEventListener('click', () => {
      modal.remove();
    });

  modal
    .querySelector('#create-user-form')
    .addEventListener('submit', async e => {

      e.preventDefault();

      const form = new FormData(e.target);

      await createUser({
        email: form.get('email'),
        password: form.get('password'),
        role: form.get('role')
      });

      modal.remove();

      renderUsersTable();

    });

}