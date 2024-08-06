const API_BASE_URL = 'http://localhost:3000';

// Função para buscar colaboradores
const fetchColaboradores = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/colaborador`);
        if (!response.ok) throw new Error('Erro ao buscar colaboradores');
        return response.json();
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar colaboradores');
    }
};

// Função para buscar colaborador por matrícula
const fetchColaboradorByMatricula = async (matricula) => {
    try {
        const response = await fetch(`${API_BASE_URL}/colaborador/${matricula}`);
        if (!response.ok) throw new Error('Erro ao buscar colaborador');
        return response.json();
    } catch (error) {
        console.error(error);
        alert('Colaborador não encontrado');
    }
};

// Função para atualizar colaborador
const updateColaborador = async (matricula, updatedColaborador) => {
    try {
        const response = await fetch(`${API_BASE_URL}/colaborador/${matricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedColaborador)
        });
        if (!response.ok) {
            const errorDetails = await response.text(); // Obter detalhes do erro
            throw new Error(`Erro ao atualizar colaborador: ${response.statusText}. Detalhes: ${errorDetails}`);
        }
        return response.json();
    } catch (error) {
        console.error('Erro ao atualizar colaborador', error);
        throw error; // Lança o erro para ser tratado na chamada da função
    }
};

// Função para deletar colaborador
const deleteColaborador = async (matricula) => {
    try {
        const response = await fetch(`${API_BASE_URL}/colaborador/${matricula}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao excluir colaborador');
    } catch (error) {
        console.error('Erro ao excluir colaborador', error);
        throw error;
    }
};

// Função para exibir colaboradores
const displayColaboradores = async (colaboradores) => {
    const colaboradorContainer = document.getElementById('colaboradores');
    colaboradorContainer.innerHTML = '';

    colaboradores.forEach(colaborador => {
        colaboradorContainer.innerHTML += `
            <div data-id="${colaborador.matricula}" class="colaborador-card">
                <p><strong>Matrícula:</strong> ${colaborador.matricula}</p>
                <p><strong>Nome:</strong> ${colaborador.nome}</p>
                <p><strong>Cargo:</strong> ${colaborador.cargo}</p>
                <p><strong>Setor:</strong> ${colaborador.setor}</p>
                <p>
                    <span class="pin" id="pin-${colaborador.matricula}" style="display: none;">${colaborador.pin}</span>
                    <button class="show-pin-btn" data-id="${colaborador.matricula}"><i class="bi bi-eye"></i></button>
                </p>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;
    });

    // Adiciona ouvintes para mostrar/ocultar PIN, editar e excluir
    document.querySelectorAll('.show-pin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const pinElement = document.getElementById(`pin-${id}`);
            const isHidden = pinElement.style.display === 'none';
            const icon = btn.querySelector('i');

            pinElement.style.display = isHidden ? 'inline' : 'none';
            icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.parentElement.getAttribute('data-id');
            openEditModal(id);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.parentElement.getAttribute('data-id');
            deleteColaboradorHandler(id);
        });
    });
};

// Função para pesquisar colaborador por matrícula
const searchColaborador = async (e) => {
    e.preventDefault();
    const matricula = document.getElementById('search-matricula').value.trim();

    if (matricula) {
        try {
            const colaborador = await fetchColaboradorByMatricula(matricula);
            displayColaboradores([colaborador]);
        } catch (error) {
            alert('Colaborador não encontrado');
            document.getElementById('search-matricula').value = '';
            const colaboradores = await fetchColaboradores();
            displayColaboradores(colaboradores);
        }
    } else {
        const colaboradores = await fetchColaboradores();
        displayColaboradores(colaboradores);
    }
};

// Função para alternar a visibilidade da senha
const togglePasswordVisibility = (inputId, buttonId) => {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(buttonId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<i class="bi bi-eye"></i>';
    }
};

document.getElementById('toggle-modal-password').addEventListener('click', () => {
    togglePasswordVisibility('modal-pin', 'toggle-modal-password');
});

// Adicionar event listeners
document.getElementById('search-btn').addEventListener('click', searchColaborador);

document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const matricula = document.getElementById('modal-matricula').value;
    const updatedColaborador = {
        matricula: document.getElementById('modal-matricula').value,
        nome: document.getElementById('modal-nome').value,
        cargo: document.getElementById('modal-cargo').value,
        setor: document.getElementById('modal-setor').value,
        pin: document.getElementById('modal-pin').value
    };

    try {
        await updateColaborador(matricula, updatedColaborador);
        document.getElementById('edit-modal').style.display = 'none';
        fetchColaboradores().then(displayColaboradores);
    } catch (error) {
        alert('Erro ao atualizar colaborador');
    }
});

const openEditModal = async (matricula) => {
    try {
        const colaborador = await fetchColaboradorByMatricula(matricula);
        document.getElementById('modal-matricula').value = colaborador.matricula;
        document.getElementById('modal-matricula-display').value = colaborador.matricula;
        document.getElementById('modal-nome').value = colaborador.nome;
        document.getElementById('modal-cargo').value = colaborador.cargo;
        document.getElementById('modal-setor').value = colaborador.setor;
        document.getElementById('modal-pin').value = colaborador.pin;

        document.getElementById('edit-modal').style.display = 'block';
    } catch (error) {
        alert('Erro ao abrir modal de edição');
    }
};

const deleteColaboradorHandler = async (matricula) => {
    if (confirm('Tem certeza que deseja excluir este colaborador?')) {
        try {
            await deleteColaborador(matricula);
            fetchColaboradores().then(displayColaboradores);
        } catch (error) {
            alert('Erro ao excluir colaborador');
        }
    }
};

fetchColaboradores().then(displayColaboradores);
