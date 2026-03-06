export function saveToken(token){
    localStorage.setItem('backoffice_token', token);
}

export function getToken(){
    return localStorage.getItem('backoffice_token');
}

export function logout(){
    localStorage.removeItem('backoffice_token');
    window.location.href = '/login.html';
}