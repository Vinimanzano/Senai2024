const API_BASE_URL = 'http://localhost:3000';

const createColaborador = async (colaborador) => {
    if (!colaborador.nome || !colaborador.cargo || !colaborador.setor || !colaborador.pin || !colaborador.matricula) {
        throw new Error('Todos os campos são obrigatórios');
    }

    const response = await fetch(`${API_BASE_URL}/colaborador`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colaborador)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao criar colaborador: ${errorData.message || response.statusText}`);
    }

    return response.json();
};

document.getElementById('create-colaborador-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const colaborador = Object.fromEntries(formData.entries());

    try {
        await createColaborador(colaborador);
        alert('Colaborador criado com sucesso!');
        e.target.reset();
    } catch (error) {
        console.error('Erro ao criar colaborador', error);
        alert(`Erro: ${error.message}`);
    }
});

// Função para alternar a visibilidade da senha
const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('pin');
    const toggleButton = document.getElementById('toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<i class="bi bi-eye"></i>';
    }
};

document.getElementById('toggle-password').addEventListener('click', togglePasswordVisibility);
