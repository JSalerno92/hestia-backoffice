// import { renderDashboard } from './pages/dashboard.js';
import { logout } from './auth/authStore.js';
import { requireAuth } from './auth/requireAuth.js';
import { renderDashboard } from './pages/dashboard/dashboardPage.js';
import { renderServicesPage } from './modules/services/servicesPage.js';
import { renderAvailabilityPage } from './modules/availability/availabilityPage.js';
import { renderWelcomeMessagesPage } from './modules/welcome-message/welcomeMessagePage.js';

const content = document.getElementById('pageContent');
const pageTitle = document.getElementById('pageTitle');

document.querySelectorAll('[data-page]').forEach(btn => {

  btn.addEventListener('click', () => {

    const page = btn.dataset.page;
    
    if (page === 'dashboard') {
      pageTitle.textContent = 'Dashboard';
      renderDashboard(content);
    }

    if (page === 'services') {
      pageTitle.textContent = 'Servicios';
      renderServicesPage(content);
    }

    if (page === 'availability') {
      pageTitle.textContent = 'Turnos';
      renderAvailabilityPage(content);
    }
    
    if (page === 'welcome-message') {
      pageTitle.textContent = 'Mensaje de Bienvenida';
      renderWelcomeMessagesPage(content);
    }
    

  });

});

document.getElementById('logoutBtn').addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
});

pageTitle.textContent = 'Dashboard';
renderDashboard(content);