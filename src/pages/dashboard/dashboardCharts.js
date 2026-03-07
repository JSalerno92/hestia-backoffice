import { getWelcomeMessages } from "../../api/welcomeMessageApi";

export async function renderDashboardCharts(container){

    const messages = await getWelcomeMessages();

    const active = messages.filter(m => m.is_active).length;
    const inactive = messages.length - active;

    container.innerHTML = `

        <div class="chart-card">

            <h3>Welcome Messages Status</h3>

            <canvas id="messagesChart" width="400" height="200"></canvas>

        </div>

    `;

    const canvas = document.getElementById("messagesChart");
    const ctx = canvas.getContext("2d");

    const total = active + inactive;

    const activeWidth = (active / total) * canvas.width;
    const inactiveWidth = canvas.width - activeWidth;

    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(0, 50, activeWidth, 50);

    ctx.fillStyle = "#F44336";
    ctx.fillRect(activeWidth, 50, inactiveWidth, 50);

    ctx.fillStyle = "#000";
    ctx.fillText(`Active: ${active}`, 10, 40);
    ctx.fillText(`Inactive: ${inactive}`, activeWidth + 10, 40);

}