const API_BASE_URL = 'http://localhost:3000';

const fetchOS = async () => {
    const response = await fetch(`${API_BASE_URL}/os`);
    if (!response.ok) throw new Error('Erro ao buscar ordens de serviço');
    return response.json();
};

const createOS = async (os) => {
    const response = await fetch(`${API_BASE_URL}/os`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(os)
    });
    if (!response.ok) throw new Error('Erro ao criar ordem de serviço');
    return response.json();
};

const updateOS = async (id, os) => {
    const response = await fetch(`${API_BASE_URL}/os/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(os)
    });
    if (!response.ok) throw new Error('Erro ao atualizar ordem de serviço');
    return response.json();
};

const deleteOS = async (id) => {
    const response = await fetch(`${API_BASE_URL}/os/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao excluir ordem de serviço');
};

const displayOS = async () => {
    const osContainer = document.getElementById('os');
    try {
        const ordens = await fetchOS();
        osContainer.innerHTML = '';
        ordens.forEach(os => {
            osContainer.innerHTML += `
                <div data-id="${os.id}">
                    <p>${os.descricao} - Status: ${os.status}</p>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </div>
            `;
        });

        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentElement.getAttribute('data-id');
                editOS(id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentElement.getAttribute('data-id');
                deleteOSHandler(id);
            });
        });

    } catch (error) {
        console.error('Erro ao buscar ordens de serviço', error);
    }
};

const deleteOSHandler = async (id) => {
    try {
        await deleteOS(id);
        displayOS();
    } catch (error) {
        console.error('Erro ao excluir ordem de serviço', error);
    }
};

const editOS = async (id) => {
    try {
        const ordens = await fetchOS();
        const ordem = ordens.find(os => os.id === id);
        if (ordem) {
            document.getElementById('id').value = ordem.id;
            document.getElementById('descricao').value = ordem.descricao;
            document.getElementById('status').value = ordem.status;
        }
    } catch (error) {
        console.error('Erro ao buscar ordem de serviço para edição', error);
    }
};

document.getElementById('os-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const os = Object.fromEntries(formData.entries());

    try {
        if (os.id) {
            await updateOS(os.id, os);
        } else {
            await createOS(os);
        }
        form.reset();
        displayOS();
    } catch (error) {
        console.error('Erro ao salvar ordem de serviço', error);
    }
});

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
});

displayOS();
