import { renderUsersTable } from './usersTable.js';
import { openCreateUserModal } from './usersCreateModal.js';

export async function renderUsersPage(container) {

  container.innerHTML = `
    <div class="page-header">
      <h1>Usuarios</h1>

      <button 
        id="createUserBtn"
        class="primary">
        Nuevo usuario
      </button>
    </div>

    <div id="usersTable"></div>
  `;

  renderUsersTable(
    document.getElementById('usersTable')
  );

  document
    .getElementById('createUserBtn')
    .addEventListener('click', () => {
      openCreateUserModal();
    });

}