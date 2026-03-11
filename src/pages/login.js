import { login } from "../api/authApi";
import { saveToken } from "../auth/authStore";

const form = document.getElementById('loginForm');
const errorEl = document.getElementById('loginError');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    errorEl.textContent = '';

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    try {

        const data = await login(email, password);

        if(!data.token){
            throw new Error('Token no recibido');
        }
        
        saveToken(data.token);

        window.location.href = '/';

    } catch (err){

        console.error('LOGIN ERROR:', err);

        errorEl.textContent = err.message;

    }

});

const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {

  const isHidden = passwordInput.type === 'password';

  passwordInput.type = isHidden ? 'text' : 'password';

  togglePassword.textContent = isHidden ? '🙈' : '👁';

});