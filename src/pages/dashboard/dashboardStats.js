import { getServices } from "../../api/servicesApi.js";
import { getAvailability } from "../../api/availabilityApi.js";
import { getWelcomeMessages } from "../../api/welcomeMessageApi.js";

export async function renderDashboardStats(container){

    const [
        services,
        availability,
        welcomeMessages
    ] = await Promise.all([
        getServices(),
        getAvailability(),
        getWelcomeMessages()
    ]);

    const activeMessages = welcomeMessages.filter(m => m.is_active).length;

    container.innerHTML = `

        <div class="stats-grid">

            <div class="stat-card">
                <h3>${services.length}</h3>
                <p>Services</p>
            </div>

            <div class="stat-card">
                <h3>${availability.length}</h3>
                <p>Availability Slots</p>
            </div>

            <div class="stat-card">
                <h3>${welcomeMessages.length}</h3>
                <p>Welcome Messages</p>
            </div>

            <div class="stat-card">
                <h3>${activeMessages}</h3>
                <p>Active Messages</p>
            </div>

        </div>

    `;

}