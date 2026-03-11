import { changeUserPassword } from '../../api/usersApi.js';

export function openPasswordModal(userId) {

  const modal = document.createElement('div');

  modal.className = 'modal-overlay';

  modal.innerHTML = `
    <div class="modal">

      <h2>Cambiar password</h2>

      <form id="password-form" class="backoffice-form">

        <div class="backoffice-group">
          <label>Nueva contraseña</label>
          <input 
            type="password"
            name="password"
            required
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%@!]).{8,}$"
            title="La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial (#$%@!)"
          />
        </div>

        <div class="backoffice-group btn">
          <button type="submit" class="submit-btn">
            Guardar
          </button>
        </div>

      </form>

      <button class="cancel-btn">Cancelar</button>

    </div>
  `;

  document.body.appendChild(modal);

  attachEvents(modal, userId);

}

function attachEvents(modal, userId) {

  modal
    .querySelector('.cancel-btn')
    .addEventListener('click', () => {
      modal.remove();
    });

  modal
    .querySelector('#password-form')
    .addEventListener('submit', async e => {

      e.preventDefault();

      const form = new FormData(e.target);

      await changeUserPassword(
        userId,
        form.get('password')
      );

      modal.remove();

    });

}