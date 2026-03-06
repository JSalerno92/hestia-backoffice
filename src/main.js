import { renderServicesPage } from './modules/services/servicesPage.js';
import { logout } from './auth/authStore.js';
import { renderAvailabilityPage } from './modules/availability/availabilityPage.js';

const content = document.getElementById('pageContent');
const pageTitle = document.getElementById('pageTitle');

document.querySelectorAll('[data-page]').forEach(btn => {

  btn.addEventListener('click', () => {

    const page = btn.dataset.page;

    if (page === 'services') {
      pageTitle.textContent = 'Servicios';
      renderServicesPage(content);
    }

    if (page === 'availability') {
      pageTitle.textContent = 'Turnos';
      renderAvailabilityPage(content);
    }

  });

});

document.getElementById('logoutBtn').addEventListener('click', logout);

renderServicesPage(content);