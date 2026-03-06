const API_URL = 'https://api.casahestia.com.ar/api';

export async function apiLogin(email, password) {

  const res = await fetch(`${API_URL}/admin/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();

}

export async function apiFetch(url, options = {}) {

  const token = localStorage.getItem('admin_token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  if (res.status === 401) {
    window.location.href = '/login.html';
  }

  return res.json();

}