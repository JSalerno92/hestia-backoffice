import { renderDashboardStats } from "./dashboardStats.js";
import { renderDashboardCharts } from "./dashboardCharts.js";

export function renderDashboard(container){

    container.innerHTML = `

        <div class="dashboard-section">

            <h1>Dashboard</h1>

            <div id="dashboardStats"></div>

            <div id="dashboardCharts"></div>

        </div>

    `;

    renderDashboardStats(
        document.getElementById("dashboardStats")
    );

    renderDashboardCharts(
        document.getElementById("dashboardCharts")
    );

}