const perfilId = JSON.parse(localStorage.getItem('user'));
const idEquip = window.localStorage.getItem('idEquip');
const form = document.querySelector("#comentarioForm")

console.log(perfilId.perfilId, Number(idEquip));

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

        switch(comentario.perfil) {
            case 1: perfil = 'Comum';
            break;
            case 2: perfil = 'Administrador';
            break;
            case 3: perfil = 'Tecnico';
            break;
            case 4: perfil = 'Gerente'
            break;
        }

        const comentarioDiv = document.createElement('div');
        comentarioDiv.className = 'comentario-item';
        comentarioDiv.innerHTML = `
            <p class="perfilNome"><strong>Perfil: </strong> ${perfil}</p>
            <p><strong>Comentário:</strong> ${comentario.comentario}</p>
            <p><strong>Data:</strong> ${new Date(comentario.data).toLocaleString()}</p>
        `;

        if (perfilId === 2 || perfilId === 3 || perfilId === 4) {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.title = 'Deletar Comentário';
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.onclick = () => deleteComentario(comentario.id);
            comentarioDiv.appendChild(deleteButton);
        }

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

        comentarioInput.value = '';
        fetchComentarios();
        closeModal();
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }

})

async function deleteComentario(comentarioId) {
    try {
        const response = await fetch(`http://localhost:3000/comentarios/${comentarioId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        fetchComentarios();
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
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

document.addEventListener('DOMContentLoaded', fetchComentarios);

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};
