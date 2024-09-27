const API_BASE_URL = 'http://localhost:3000';

const login = async (email, senha) => {
    const response = await fetch(`${API_BASE_URL}/index`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer login');
    }

    return response.json();
};

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const { token } = await login(email, senha);
        window.location.href = 'principal.html'; 
    } catch (error) {
        document.getElementById('error-message').innerText = error.message;
    }
});

document.getElementById('toggle-password').addEventListener('click', () => {
    const passwordField = document.getElementById('senha');
    const toggleButton = document.getElementById('toggle-password').querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.classList.remove('bi-eye');
        toggleButton.classList.add('bi-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleButton.classList.remove('bi-eye-slash');
        toggleButton.classList.add('bi-eye');
    }
});
