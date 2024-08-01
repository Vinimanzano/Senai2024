document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

const API_BASE_URL = 'http://localhost:3000';

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

document.getElementById('toggle-password').addEventListener('click', () => {
    togglePasswordVisibility('pin', 'toggle-password');
});

document.getElementById('toggle-modal-password').addEventListener('click', () => {
    togglePasswordVisibility('modal-pin', 'toggle-modal-password');
});

const fetchColaboradores = async () => {
    const response = await fetch(`${API_BASE_URL}/colaborador`);
    if (!response.ok) throw new Error('Erro ao buscar colaboradores');
    return response.json();
};

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

const updateColaborador = async (id, colaborador) => {
    const response = await fetch(`${API_BASE_URL}/colaborador/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colaborador)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar colaborador: ${errorData.message || response.statusText}`);
    }
    return response.json();
};

const deleteColaborador = async (id) => {
    const response = await fetch(`${API_BASE_URL}/colaborador/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao excluir colaborador');
};

const displayColaboradores = async () => {
    const colaboradorContainer = document.getElementById('colaboradores');
    try {
        const colaboradores = await fetchColaboradores();
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
                        <button class="show-pin-btn" data-id="${colaborador.matricula}">Mostrar PIN</button>
                    </p>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </div>
            `;
        });

        document.querySelectorAll('.show-pin-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const pinElement = document.getElementById(`pin-${id}`);
                const isHidden = pinElement.style.display === 'none';

                pinElement.style.display = isHidden ? 'inline' : 'none';
                btn.innerText = isHidden ? 'Ocultar PIN' : 'Mostrar PIN';
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

    } catch (error) {
        console.error('Erro ao buscar colaboradores', error);
    }
};

const deleteColaboradorHandler = async (id) => {
    try {
        await deleteColaborador(id);
        displayColaboradores();
    } catch (error) {
        console.error('Erro ao excluir colaborador', error);
    }
};

const openEditModal = async (id) => {
    try {
        const colaboradores = await fetchColaboradores();
        const colaborador = colaboradores.find(col => col.matricula === id);
        if (colaborador) {
            document.getElementById('modal-matricula').value = colaborador.matricula;
            document.getElementById('modal-matricula-display').value = colaborador.matricula;
            document.getElementById('modal-nome').value = colaborador.nome;
            document.getElementById('modal-cargo').value = colaborador.cargo;
            document.getElementById('modal-setor').value = colaborador.setor;
            document.getElementById('modal-pin').value = colaborador.pin;

            const modal = document.getElementById('edit-modal');
            modal.style.display = 'block';

            document.querySelector('.close').onclick = () => {
                modal.style.display = 'none';
            };

            document.getElementById('edit-form').onsubmit = async (e) => {
                e.preventDefault();
                const updatedColaborador = {
                    matricula: document.getElementById('modal-matricula').value,
                    nome: document.getElementById('modal-nome').value,
                    cargo: document.getElementById('modal-cargo').value,
                    setor: document.getElementById('modal-setor').value,
                    pin: document.getElementById('modal-pin').value
                };
                try {
                    await updateColaborador(updatedColaborador.matricula, updatedColaborador);
                    modal.style.display = 'none';
                    displayColaboradores();
                } catch (error) {
                    console.error('Erro ao atualizar colaborador', error);
                }
            };
        }
    } catch (error) {
        console.error('Erro ao abrir modal de edição', error);
    }
};

document.addEventListener('DOMContentLoaded', displayColaboradores);