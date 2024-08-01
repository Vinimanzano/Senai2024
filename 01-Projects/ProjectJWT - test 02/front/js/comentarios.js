const API_BASE_URL = 'http://localhost:3000';

const fetchComentarios = async () => {
    const response = await fetch(`${API_BASE_URL}/comentarios`);
    if (!response.ok) throw new Error('Erro ao buscar comentários');
    return response.json();
};

const createComentario = async (comentario) => {
    const response = await fetch(`${API_BASE_URL}/comentarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comentario)
    });
    if (!response.ok) throw new Error('Erro ao criar comentário');
    return response.json();
};

const updateComentario = async (id, comentario) => {
    const response = await fetch(`${API_BASE_URL}/comentarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comentario)
    });
    if (!response.ok) throw new Error('Erro ao atualizar comentário');
    return response.json();
};

const deleteComentario = async (id) => {
    const response = await fetch(`${API_BASE_URL}/comentarios/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao excluir comentário');
};

const displayComentarios = async () => {
    const comentariosContainer = document.getElementById('comentarios');
    try {
        const comentarios = await fetchComentarios();
        comentariosContainer.innerHTML = '';
        comentarios.forEach(comentario => {
            comentariosContainer.innerHTML += `
                <div data-id="${comentario.id}">
                    <p>${comentario.texto}</p>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </div>
            `;
        });

        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentElement.getAttribute('data-id');
                editComentario(id);
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
        displayComentarios();
    } catch (error) {
        console.error('Erro ao excluir comentário', error);
    }
};


const editComentario = async (id) => {
    try {
        const comentarios = await fetchComentarios();
        const comentario = comentarios.find(com => com.id === id);
        if (comentario) {
            document.getElementById('id').value = comentario.id;
            document.getElementById('texto').value = comentario.texto;
        }
    } catch (error) {
        console.error('Erro ao buscar comentário para edição', error);
    }
};


document.getElementById('comentario-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const comentario = Object.fromEntries(formData.entries());

    try {
        if (comentario.id) {
            await updateComentario(comentario.id, comentario);
        } else {
            await createComentario(comentario);
        }
        form.reset();
        displayComentarios();
    } catch (error) {
        console.error('Erro ao salvar comentário', error);
    }
});

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
});

displayComentarios();
