import { apiFetch } from "./apiClients";

export async function login(email, password){

    return apiFetch('/api/admin/auth/login',{
        method:'POST',
        body:JSON.stringify({
            email,
            password
        })
    });

}