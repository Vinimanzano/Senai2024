const API_BASE_URL = 'http://localhost:3000';

let allComments = [];

const fetchComentario = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/comentario`);
        if (!response.ok) throw new Error('Erro ao buscar comentários');
        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar comentários', error);
    }
};

const createComentario = async (comentario) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario)
        });
        if (!response.ok) {
            const errorDetails = await response.text(); // Obter detalhes do erro
            throw new Error(`Erro ao criar comentário: ${response.statusText}. Detalhes: ${errorDetails}`);
        }
        return response.json();
    } catch (error) {
        console.error('Erro ao criar comentário', error);
    }
};

const updateComentario = async (id, comentario) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comentario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario)
        });
        if (!response.ok) throw new Error('Erro ao atualizar comentário');
        return response.json();
    } catch (error) {
        console.error('Erro ao atualizar comentário', error);
    }
};

const deleteComentario = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comentario/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao excluir comentário');
    } catch (error) {
        console.error('Erro ao excluir comentário', error);
    }
};

const displayComentario = (comentarios) => {
    const comentarioContainer = document.getElementById('comentarios');
    comentarioContainer.innerHTML = '';
    comentarios.forEach(comentario => {
        comentarioContainer.innerHTML += `
            <div data-id="${comentario.id}">
                <p><strong>ID:</strong> ${comentario.id}</p>
                <p><strong>OS:</strong> ${comentario.os}</p>
                <p><strong>Colaborador:</strong> ${comentario.colaborador}</p>
                <p><strong>Data:</strong> ${new Date(comentario.data).toLocaleString()}</p>
                <p><strong>Comentário:</strong> ${comentario.comentario}</p>
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
            deleteComentarioHandler(id);
        });
    });
};

const deleteComentarioHandler = async (id) => {
    try {
        await deleteComentario(id);
        allComments = await fetchComentario();
        displayComentario(allComments);
    } catch (error) {
        console.error('Erro ao excluir comentário', error);
    }
};

const openCreateModal = () => {
    document.getElementById('create-modal').style.display = 'flex';
};

const closeCreateModal = () => {
    document.getElementById('create-modal').style.display = 'none';
};

const openEditModal = async (id) => {
    try {
        const comentarios = await fetchComentario();
        const comentario = comentarios.find(com => com.id == id);
        if (comentario) {
            document.getElementById('modal-id').value = comentario.id;
            document.getElementById('modal-texto').value = comentario.comentario;
            document.getElementById('edit-modal').style.display = 'flex';
        }
    } catch (error) {
        console.error('Erro ao buscar comentário para edição', error);
    }
};

const closeEditModal = () => {
    document.getElementById('edit-modal').style.display = 'none';
};

const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const id = document.getElementById('modal-id').value;
    const comentario = {
        comentario: document.getElementById('modal-texto').value
    };
    try {
        await updateComentario(id, comentario);
        closeEditModal();
        allComments = await fetchComentario();
        displayComentario(allComments);
    } catch (error) {
        console.error('Erro ao atualizar comentário', error);
    }
};

const handleCreateFormSubmit = async (event) => {
    event.preventDefault();
    const comentario = {
        os: document.getElementById('create-os').value.trim(),
        colaborador: document.getElementById('create-colaborador').value.trim(),
        data: new Date(document.getElementById('create-data').value).toISOString(),
        comentario: document.getElementById('create-comentario').value.trim()
    };

    // Verificar se todos os campos estão preenchidos
    if (!comentario.os || !comentario.colaborador || !comentario.data || !comentario.comentario) {
        console.error('Todos os campos são obrigatórios');
        return;
    }

    try {
        const result = await createComentario(comentario);
        if (result) {
            closeCreateModal();
            allComments = await fetchComentario();
            displayComentario(allComments);
        }
    } catch (error) {
        console.error('Erro ao criar comentário', error);
    }
};

const openComentarioModal = async (id) => {
    try {
        const comentario = await fetchComentarioById(id);
        if (comentario) {
            document.getElementById('details-id').textContent = comentario.id;
            document.getElementById('details-comentario').textContent = comentario.comentario;
            document.getElementById('details-colaborador').textContent = comentario.colaborador || 'Não definido';
            document.getElementById('details-os').textContent = comentario.os || 'Não definido';
            document.getElementById('details-data').textContent = new Date(comentario.data).toLocaleString();

            document.getElementById('comentario-detail-modal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao buscar comentário para visualização', error);
    }
};

const closeComentarioModal = () => {
    document.getElementById('comentario-detail-modal').style.display = 'none';
};

const handleSearch = () => {
    const searchId = document.getElementById('search-id').value;
    if (searchId) {
        const filteredComments = allComments.filter(comentario => comentario.id == searchId);
        displayComentario(filteredComments);
    } else {
        displayComentario(allComments);
    }
};

const init = async () => {
    try {
        allComments = await fetchComentario();
        displayComentario(allComments);

        document.getElementById('create-form').addEventListener('submit', handleCreateFormSubmit);
        document.getElementById('edit-form').addEventListener('submit', handleEditFormSubmit);
        document.querySelector('#create-modal .close-create').addEventListener('click', closeCreateModal);
        document.querySelector('#edit-modal .close').addEventListener('click', closeEditModal);
        document.querySelector('#comentario-detail-modal .close-details').addEventListener('click', closeComentarioModal);
        document.getElementById('search-btn').addEventListener('click', handleSearch);
        document.getElementById('open-create-modal').addEventListener('click', openCreateModal);
        document.getElementById('back-button').addEventListener('click', () => {
            window.history.back();
        });
    } catch (error) {
        console.error('Erro ao buscar comentários iniciais', error);
    }
};

init();
