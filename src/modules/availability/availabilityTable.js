import { fetchAvailability, reduceSlot } from '../../api/availabilityApi.js';
import { formatDateISOToDDMMYYYY } from '../../utils/formatUtilities.js';

export async function renderAvailabilityTable(container) {

  const slots = await fetchAvailability({ limit: 200 });

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Capacity</th>
          <th>Reservados</th>
          <th>Disponibles</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        ${slots.map(slot => {

          const available = slot.capacity - slot.booked;

          return `
            <tr>
              <td>${slot.service_name}</td>
              <td>${formatDateISOToDDMMYYYY(slot.date)}</td>
              <td>${slot.time_slot}</td>
              <td>${slot.capacity}</td>
              <td>${slot.booked}</td>
              <td>${available}</td>
              <td>
                <button
                  class="danger reduce-slot"
                  data-service="${slot.service_id}"
                  data-date="${slot.date}"
                  data-time="${slot.time_slot}"
                >
                  Reducir
                </button>
              </td>
            </tr>
          `;

        }).join("")}
      </tbody>
    </table>
  `;

  container.querySelectorAll(".reduce-slot").forEach(btn => {

    btn.addEventListener("click", async () => {

      const confirmation = prompt("Escriba REDUCIR para confirmar");

      if (confirmation !== "REDUCIR") return;

      await reduceSlot({
        service_id: btn.dataset.service,
        date: btn.dataset.date,
        time_slot: btn.dataset.time,
        confirmation_text: "REDUCIR"
      });

      location.reload();

    });

  });

}