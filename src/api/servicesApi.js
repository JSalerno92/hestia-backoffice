import { apiFetch } from "./apiClients";

export function getServices() {
    return apiFetch('/api/admin/services');
}

export function createService(data) {
    return apiFetch('/api/admin/services', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function updateService(id, data) {
    return apiFetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
}

export function deleteService(id) {
    return apiFetch(`/api/admin/services/${id}`, {
        method: 'DELETE'
    });
}