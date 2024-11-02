const perfilId = JSON.parse(localStorage.getItem('user'));
const idEquip = window.localStorage.getItem('idEquip');
const form = document.querySelector("#comentarioForm");

let comentarioId;

console.log(perfilId.perfilId,idEquip);

async function fetchComentarios() {
    try {
        const response = await fetch(`http://localhost:3000/comentarios/${idEquip}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const comentarios = await response.json();
        renderComentarios(comentarios);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        document.getElementById('comentarios').innerText = 'Erro ao carregar comentários.';
    }
}

function renderComentarios(comentarios) {
    const comentariosDiv = document.getElementById('comentarios');
    comentariosDiv.innerHTML = '';

    comentarios.forEach(comentario => {
        let perfil;

        switch (comentario.perfil) {
            case 1: perfil = 'Comum'; break;
            case 2: perfil = 'Administrador'; break;
            case 3: perfil = 'Técnico'; break;
            case 4: perfil = 'Gerente'; break;
        }

        const comentarioDiv = document.createElement('div');
        comentarioDiv.className = 'comentario-item';
        comentarioDiv.innerHTML = `
            <p class="perfilNome"><strong>Perfil: </strong> ${perfil}</p>
            <p><strong>Comentário:</strong> ${comentario.comentario}</p>
            <p><strong>Data:</strong> ${new Date(comentario.data).toLocaleString()}</p>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';

        if (comentario.perfil === perfilId.perfilId) {
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
            editButton.title = 'Editar Comentário';
            editButton.className = 'btn btn-primary btn-sm';
            editButton.onclick = () => openModalUpdate(comentario.id, comentario.comentario);
            buttonContainer.appendChild(editButton);
        }

        if (comentario.perfil === perfilId.perfilId || perfilId.perfilId === 2) {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.title = 'Deletar Comentário';
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.onclick = () => deleteComentario(comentario.id);
            buttonContainer.appendChild(deleteButton);
        }

        comentarioDiv.appendChild(buttonContainer);
        comentariosDiv.appendChild(comentarioDiv);
    });
}



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        comentario: form.comentario.value,
        equipamentoId: Number(idEquip),
        perfilId: perfilId.perfilId
    }

    try {
        const response = await fetch('http://localhost:3000/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        form.comentario.value = '';
        fetchComentarios();
        closeModal();
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
});

async function deleteComentario(comentarioId) {
    try {
        const response = await fetch(`http://localhost:3000/comentarios/${comentarioId}`);
        const comentario = await response.json();

        if (comentario.perfil !== perfilId.perfilId && perfilId.perfilId !== 2) {
            alert("Você não tem permissão para excluir este comentário.");
            return;
        }

        if (confirm("Deseja excluir o comentário?")) {
            const deleteResponse = await fetch(`http://localhost:3000/comentarios/${comentarioId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error(`Erro: ${deleteResponse.status} - ${deleteResponse.statusText}`);
            }

            fetchComentarios();
        }
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
    }
}



async function editComentario() {
    const comentarioAtualizado = {
        id: comentarioId,
        comentario: document.getElementById('updateInput').value,
        perfilId: perfilId.perfilId
    };

    try {
        const response = await fetch(`http://localhost:3000/comentarios/${comentarioId}/${perfilId.perfilId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comentarioAtualizado),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        fetchComentarios();
        closeModalUpdate();
    } catch (error) {
        console.error('Erro ao editar comentário:', error);
    }
}


const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.onclick = function() {
    modal.style.display = 'block';
};
closeModalButton.onclick = function() {
    closeModal();
};

function closeModal() {
    modal.style.display = 'none';
}

const update = document.getElementById('update');
const closeModalUpdateButton = document.getElementById('closeModalUpdate');

function openModalUpdate(id, comentarioTexto) {
    comentarioId = id;
    document.getElementById('updateInput').value = comentarioTexto;
    update.style.display = 'block';
}

closeModalUpdateButton.onclick = function() {
    closeModalUpdate();
};

function closeModalUpdate() {
    update.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchComentarios);

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
    if (event.target == update) {
        closeModalUpdate();
    }
};