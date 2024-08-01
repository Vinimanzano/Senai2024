const API_BASE_URL = 'http://localhost:3000';

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

const displayComentario = async () => {
    const comentarioContainer = document.getElementById('comentarios');
    try {
        const comentarios = await fetchComentario();
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

    } catch (error) {
        console.error('Erro ao buscar comentários', error);
    }
};

const deleteComentarioHandler = async (id) => {
    try {
        await deleteComentario(id);
        displayComentario();
    } catch (error) {
        console.error('Erro ao excluir comentário', error);
    }
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
        displayComentario();
    } catch (error) {
        console.error('Erro ao atualizar comentário', error);
    }
};

const init = () => {
    displayComentario();
    document.getElementById('edit-form').addEventListener('submit', handleEditFormSubmit);
    document.querySelector('#edit-modal .close').addEventListener('click', closeEditModal);
    document.getElementById('back-button').addEventListener('click', () => {
        window.history.back();
    });
};

init();
