// Mock de dados do professor
const professor = {
    id: '1',
    nome: 'Vinicius Manzano'
};

// Mock de turmas
const turmas = [
    { id: '1', nome: 'Turma A', cadastro: 'Cadastro A' },
    { id: '2', nome: 'Turma B', cadastro: 'Cadastro B' },
];

// Exibir nome do professor
document.getElementById('nomeProfessor').textContent = professor.nome;

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
                <button onclick="verAtividades('${turma.id}')">Ver Atividades</button>
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
    const turmaIndex = turmas.findIndex(turma => turma.id === id);
    if (turmaIndex !== -1) {
        turmas.splice(turmaIndex, 1);
        listarTurmas();
        alert(`Turma excluída com sucesso!`);
    }
}

// Redirecionar para a página de atividades da turma
function verAtividades(turmaId) {
    window.location.href = `atividades.html?id=${turmaId}`; // Redireciona com o ID da turma
}

// Obtém o modal de cadastro
const modal = document.getElementById("cadastroModal");

// Obtém o botão que abre o modal
const btnCadastro = document.getElementById("cadastroButton");

// Quando o usuário clica no botão, abre o modal 
btnCadastro.onclick = function() {
    modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none"; // Fecha o modal
}

// Evento do botão de confirmação de logout
document.getElementById('confirmLogout').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redireciona para index.html
});

// Evento do botão de logout
document.getElementById('logoutButton').addEventListener('click', () => {
    document.getElementById("logoutModal").style.display = "block"; // Exibe o modal de confirmação
});

// Evento do botão "Salvar" para cadastrar a turma
document.getElementById('salvarTurma').addEventListener('click', () => {
    const nomeTurma = document.getElementById('nomeTurma').value;
    const cadastroTurma = document.getElementById('cadastroTurma').value;

    const id = String(Date.now()); // Gera um ID único
    turmas.push({ id, nome: nomeTurma, cadastro: cadastroTurma });
    
    listarTurmas();
    
    // Limpa os campos do modal
    document.getElementById('nomeTurma').value = '';
    document.getElementById('cadastroTurma').value = '';
    
    modal.style.display = "none"; // Fecha o modal
});

// Evento do botão "Cancelar" para fechar o modal
document.getElementById('cancelarTurma').addEventListener('click', () => {
    modal.style.display = "none"; // Fecha o modal
});

// Listar turmas ao carregar a página
listarTurmas();
