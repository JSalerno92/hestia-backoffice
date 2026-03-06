export function renderSidebar() {

  const sidebar = document.getElementById('sidebar');

  sidebar.innerHTML = `
  
    <h3>Casa Hestia</h3>

    <nav>

      <a href="#dashboard">Dashboard</a>

      <a href="#services">Servicios</a>

      <a href="#availability">Turnos</a>

      <a href="#bookings">Reservas</a>

      <a href="#providers">Prestadoras</a>

    </nav>

  `;

}