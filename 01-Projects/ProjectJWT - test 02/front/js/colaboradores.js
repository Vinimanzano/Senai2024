const API_BASE_URL = 'http://localhost:3000';

const fetchColaboradores = async () => {
    const response = await fetch(`${API_BASE_URL}/colaboradores`);
    if (!response.ok) throw new Error('Erro ao buscar colaboradores');
    return response.json();
};

const createColaborador = async (colaborador) => {
    const response = await fetch(`${API_BASE_URL}/colaboradores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colaborador)
    });
    if (!response.ok) throw new Error('Erro ao criar colaborador');
    return response.json();
};

const updateColaborador = async (matricula, colaborador) => {
    const response = await fetch(`${API_BASE_URL}/colaboradores/${matricula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colaborador)
    });
    if (!response.ok) throw new Error('Erro ao atualizar colaborador');
    return response.json();
};

const deleteColaborador = async (matricula) => {
    const response = await fetch(`${API_BASE_URL}/colaboradores/${matricula}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao excluir colaborador');
};

const displayColaboradores = async () => {
    const colaboradoresContainer = document.getElementById('colaboradores');
    try {
        const colaboradores = await fetchColaboradores();
        colaboradoresContainer.innerHTML = '';
        colaboradores.forEach(colaborador => {
            colaboradoresContainer.innerHTML += `
                <div data-matricula="${colaborador.matricula}">
                    <p>${colaborador.nome} - ${colaborador.cargo}</p>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </div>
            `;
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const matricula = btn.parentElement.getAttribute('data-matricula');
                editColaborador(matricula);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const matricula = btn.parentElement.getAttribute('data-matricula');
                deleteColaboradorHandler(matricula);
            });
        });

    } catch (error) {
        console.error('Erro ao buscar colaboradores', error);
    }
};

const deleteColaboradorHandler = async (matricula) => {
    try {
        await deleteColaborador(matricula);
        displayColaboradores();
    } catch (error) {
        console.error('Erro ao excluir colaborador', error);
    }
};

const editColaborador = async (matricula) => {
    try {
        const colaboradores = await fetchColaboradores();
        const colaborador = colaboradores.find(colab => colab.matricula === matricula);
        if (colaborador) {
            document.getElementById('matricula').value = colaborador.matricula;
            document.getElementById('nome').value = colaborador.nome;
            document.getElementById('cargo').value = colaborador.cargo;
            document.getElementById('setor').value = colaborador.setor;
            document.getElementById('pin').value = colaborador.pin;
        }
    } catch (error) {
        console.error('Erro ao buscar colaborador para edição', error);
    }
};

document.getElementById('colaborador-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const colaborador = Object.fromEntries(formData.entries());

    try {
        if (colaborador.matricula) {
            await updateColaborador(colaborador.matricula, colaborador);
        } else {
            await createColaborador(colaborador);
        }
        form.reset();
        displayColaboradores();
    } catch (error) {
        console.error('Erro ao salvar colaborador', error);
    }
});

const togglePassword = () => {
    const pinInput = document.getElementById('pin');
    const toggleIcon = document.querySelector('#toggle-password i');
    
    if (pinInput.type === 'password') {
        pinInput.type = 'text';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    } else {
        pinInput.type = 'password';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    }
};

document.getElementById('toggle-password').addEventListener('click', togglePassword);

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
});

displayColaboradores(); 