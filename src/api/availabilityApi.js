import { apiFetch } from "./apiClients";

export async function previewAvailability(payload) {
  return apiFetch('/api/admin/availability/preview', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function generateAvailability(payload) {
  return apiFetch('/api/admin/availability/generate', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function reduceSlot(payload) {
  return apiFetch('/api/admin/availability/reduce-slot', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function fetchAvailability(params = {}) {

  const query = new URLSearchParams(params).toString();

  return apiFetch(`/api/admin/availability?${query}`);

}