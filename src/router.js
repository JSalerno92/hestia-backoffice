import { renderDashboard } from './pages/dashboard.js';
import { renderServices } from './pages/services.js';
import { renderProviders } from './pages/providers.js';
import { renderAvailability } from './pages/availability.js';

const routes = {
  '/dashboard': renderDashboard,
  '/services': renderServices,
  '/providers': renderProviders,
  '/availability': renderAvailability
};

export function router(){

  const hash = window.location.hash.replace('#','');

  const page = routes[hash] || renderDashboard;

  document.getElementById('content').innerHTML = page();

}

export function initRouter(){

  window.addEventListener('hashchange', router);

  router();

}