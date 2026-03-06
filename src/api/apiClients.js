import { getToken } from '../auth/authStore.js';

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}){

    const token = getToken();

    const headers = {
        'Content-Type':'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`,{
        ...options,
        headers
    });

    if (res.status === 401) {
        localStorage.removeItem('backoffice_token');
        window.location.href = '/login.html';
    }

    return res.json();

}