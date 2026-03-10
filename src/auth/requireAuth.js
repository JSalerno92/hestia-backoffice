import { getToken } from './authStore.js';

export function requireAuth(){

    const token = getToken();

    if(!token){
        window.location.href = '/login.html';
    }

}