import {
  fetchUsers,
  toggleUserActive
} from '../../api/usersApi.js';

import { openCreateUserModal } from './usersCreateModal.js';
import { openPasswordModal } from './usersPaswordModal.js';

export async function renderUsersTable() {

  const container = document.getElementById('usersTable');

  const users = await fetchUsers();

  container.innerHTML = `
    <table class="table">

      <thead>
        <tr>
          <th>Email</th>
          <th>Rol</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.active ? 'Sí' : 'No'}</td>

            <td>
              <button 
                class="password-btn"
                data-id="${user.id}">
                Cambiar contraseña
              </button>

              <button 
                class="toggle-btn"
                data-id="${user.id}">
                ${user.active ? 'Desactivar' : 'Activar'}
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>

    </table>
  `;

  attachEvents();

}

function attachEvents() {

  document
    .getElementById('create-user-btn')
    ?.addEventListener('click', () => {
      openCreateUserModal();
    });

  document
    .querySelectorAll('.toggle-btn')
    .forEach(btn => {

      btn.addEventListener('click', async () => {

        const id = btn.dataset.id;

        await toggleUserActive(id);

        renderUsersTable();

      });

    });

  document
    .querySelectorAll('.password-btn')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const id = btn.dataset.id;

        openPasswordModal(id);

      });

    });

}