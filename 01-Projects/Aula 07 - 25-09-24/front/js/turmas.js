// Mock de dados para turmas
let turmas = [];

// Função para listar turmas
function listarTurmas() {
    const turmasList = document.getElementById('turmasList');
    turmasList.innerHTML = '';

    turmas.forEach(turma => {
        const turmaItem = document.createElement('div');
        turmaItem.className = 'turma-item';
        turmaItem.innerHTML = `
            <span>${turma.nome} - ${turma.cadastro}</span>
            <div class="button-group">
                <button onclick="visualizarTurma('${turma.id}')">Visualizar</button>
                <button onclick="excluirTurma('${turma.id}')">Excluir</button>
            </div>
        `;
        turmasList.appendChild(turmaItem);
    });
}

// Função para visualizar turma
function visualizarTurma(id) {
    alert(`Visualizando a turma com ID: ${id}`);
}

// Função para excluir turma
function excluirTurma(id) {
    turmas = turmas.filter(turma => turma.id !== id);
    listarTurmas();
    alert(`Turma excluída com sucesso!`);
}

// Evento do formulário de cadastro de turma
document.getElementById('turmaForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('turmaNome').value;
    const cadastro = document.getElementById('turmaCadastro').value;
    const id = String(Date.now()); // Gera um ID único baseado no timestamp

    turmas.push({ id, nome, cadastro });
    listarTurmas();

    // Limpa os campos do formulário
    document.getElementById('turmaForm').reset();
});

// Evento do botão de logout
document.getElementById('logoutButton').addEventListener('click', () => {
    alert('Saindo do sistema...');
    // Aqui você pode implementar a lógica de logout
});

// Listar turmas ao carregar a página
listarTurmas();