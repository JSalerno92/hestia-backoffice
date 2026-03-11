import { apiFetch } from "./apiClients";

export async function fetchUsers() {
  return apiFetch('/api/admin/auth/users');
}

export async function createUser(payload) {
  return apiFetch('/api/admin/auth/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function toggleUserActive(id) {
  return apiFetch(`/api/admin/auth/users/${id}/toggle-active`, {
    method: 'PATCH'
  });
}

export async function changeUserPassword(id, password) {
  return apiFetch(`/api/admin/auth/users/${id}/password`, {
    method: 'PATCH',
    body: JSON.stringify({ password })
  });
}