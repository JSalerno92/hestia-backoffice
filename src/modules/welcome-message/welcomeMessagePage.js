import { getWelcomeMessages } from '../../api/welcomeMessageApi.js';
import { renderWelcomeMessagesTable } from './welcomeMessageTable.js';
import { openWelcomeMessageModal } from './welcomeMessageModal.js';

export async function renderWelcomeMessagesPage(container){

  container.innerHTML = `

    <div style="display:flex;justify-content:space-between;margin-bottom:20px;">

      <h2>Mensajes de Bienveinida</h2>

      <button id="createWelcomeMessageBtn">
        New Message
      </button>

    </div>

    <div id="welcomeMessagesTable"></div>

  `;

  const messages = await getWelcomeMessages();

  renderWelcomeMessagesTable(
    document.getElementById('welcomeMessagesTable'),
    messages
  );

  document
    .getElementById('createWelcomeMessageBtn')
    .addEventListener('click', () => {
      openWelcomeMessageModal();
    });

}