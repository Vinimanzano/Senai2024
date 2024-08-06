const API_BASE_URL = 'http://localhost:3000';

const fetchOS = async () => {
    const response = await fetch(`${API_BASE_URL}/os`);
    if (!response.ok) throw new Error('Erro ao buscar ordens de serviço');
    return response.json();
};

const fetchOSById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/os/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar ordem de serviço por ID');
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

let allOrders = [];

const displayOS = (ordens) => {
    const osContainer = document.getElementById('os');
    osContainer.innerHTML = '';
    ordens.forEach(os => {
        osContainer.innerHTML += `
            <div data-id="${os.id}">
                <p>Descrição: ${os.descricao}</p>
                <p>Colaborador: ${os.colaborador}</p>
                <p>Executor: ${os.executor || 'Não definido'}</p>
                <p>Abertura: ${new Date(os.abertura).toLocaleString()}</p>
                <p>Encerramento: ${os.encerramento ? new Date(os.encerramento).toLocaleString() : 'Não definido'}</p>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;
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
            deleteOSHandler(id);
        });
    });
};

const deleteOSHandler = async (id) => {
    try {
        await deleteOS(id);
        allOrders = await fetchOS();
        displayOS(allOrders);
    } catch (error) {
        console.error('Erro ao excluir ordem de serviço', error);
    }
};

const openEditModal = async (id) => {
    try {
        const ordem = await fetchOSById(id);
        if (ordem) {
            document.getElementById('modal-id').value = ordem.id;
            document.getElementById('modal-descricao').value = ordem.descricao;
            document.getElementById('modal-executor').value = ordem.executor || '';
            document.getElementById('modal-abertura').value = new Date(ordem.abertura).toISOString().slice(0, 16);
            document.getElementById('modal-encerramento').value = ordem.encerramento ? new Date(ordem.encerramento).toISOString().slice(0, 16) : '';
            document.getElementById('edit-modal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao buscar ordem de serviço para edição', error);
    }
};

const closeEditModal = () => {
    document.getElementById('edit-modal').style.display = 'none';
};

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const os = Object.fromEntries(formData.entries());

    try {
        await updateOS(os.id, os);
        form.reset();
        closeEditModal();
        allOrders = await fetchOS();
        displayOS(allOrders);
    } catch (error) {
        console.error('Erro ao salvar ordem de serviço', error);
    }
});

const openDetailsModal = async (id) => {
    try {
        const ordem = await fetchOSById(id);
        if (ordem) {
            document.getElementById('details-id').textContent = ordem.id;
            document.getElementById('details-descricao').textContent = ordem.descricao;
            document.getElementById('details-colaborador').textContent = ordem.colaborador || 'Não definido';
            document.getElementById('details-executor').textContent = ordem.executor || 'Não definido';
            document.getElementById('details-abertura').textContent = new Date(ordem.abertura).toLocaleString();
            document.getElementById('details-encerramento').textContent = ordem.encerramento ? new Date(ordem.encerramento).toLocaleString() : 'Não definido';

            document.getElementById('details-modal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao buscar ordem de serviço para visualização', error);
    }
};

const closeDetailsModal = () => {
    document.getElementById('details-modal').style.display = 'none';
};

const handleSearch = async () => {
    const searchId = document.getElementById('search-id').value;
    if (searchId) {
        try {
            const ordem = await fetchOSById(searchId);
            displayOS([ordem]);
        } catch (error) {
            console.error('Erro ao buscar ordem de serviço por ID', error);
            document.getElementById('os').innerHTML = '<p>Ordem de serviço não encontrada.</p>';
        }
    } else {
        // Se o campo de pesquisa estiver vazio, exibe todas as ordens de serviço
        displayOS(allOrders);
    }
};

document.getElementById('search-btn').addEventListener('click', handleSearch);

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
});

document.querySelector('.close').addEventListener('click', closeEditModal);
document.querySelector('.close-details').addEventListener('click', closeDetailsModal);

const initialize = async () => {
    try {
        allOrders = await fetchOS();
        displayOS(allOrders);
    } catch (error) {
        console.error('Erro ao buscar ordens de serviço iniciais', error);
    }
};

initialize();