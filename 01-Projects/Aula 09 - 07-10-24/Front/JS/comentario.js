async function fetchComentarios() {
    try {
        const response = await fetch('http://localhost:3000/comentarios');
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
        const comentarioDiv = document.createElement('div');
        comentarioDiv.innerHTML = `
            <p><strong>Comentário:</strong> ${comentario.comentario}</p>
            <p><strong>Data:</strong> ${new Date(comentario.data).toLocaleString()}</p>
        `;
        comentariosDiv.appendChild(comentarioDiv);
    });
}

async function addComentario(event) {
    event.preventDefault();

    const comentarioInput = document.getElementById('comentarioInput');
    const comentario = comentarioInput.value;

    try {
        const response = await fetch('http://localhost:3000/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comentario }),
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
}

const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.onclick = function() {
    modal.style.display = 'block';
}

closeModalButton.onclick = function() {
    closeModal();
}

function closeModal() {
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchComentarios);

document.getElementById('comentarioForm').addEventListener('submit', addComentario);

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
