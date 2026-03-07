import { apiFetch } from "./apiClients";

export function getWelcomeMessages() {
  return apiFetch("/api/admin/welcome-messages");
}

export function createWelcomeMessage(data) {
  return apiFetch("/api/admin/welcome-messages", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export function updateWelcomeMessage(id, data) {
  return apiFetch(`/api/admin/welcome-messages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export function deleteWelcomeMessage(id) {
  return apiFetch(`/api/admin/welcome-messages/${id}`, {
    method: "DELETE"
  });
}

export function toggleWelcomeMessageActive(id) {
  return apiFetch(`/api/admin/welcome-messages/${id}/toggle-active`, {
    method: "PATCH"
  });
}

export function setDefaultWelcomeMessage(id) {
  return apiFetch(`/api/admin/welcome-messages/${id}/set-default`, {
    method: "PATCH"
  });
}