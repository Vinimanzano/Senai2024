// Mock de dados de turmas
const turmas = [
    { id: '1', nome: 'Turma A', cadastro: 'Cadastro A' },
    { id: '2', nome: 'Turma B', cadastro: 'Cadastro B' }
];

// Mock de dados de atividades
const atividades = {
    '1': [],
    '2': []
};

// Mock de dados do professor
const professor = {
    id: '1',
    nome: 'Vinicius Manzano'
};

// Obtém o ID da turma da URL
const params = new URLSearchParams(window.location.search);
const turmaId = params.get('id');

// Verifica se a turma existe
const turmaSelecionada = turmas.find(turma => turma.id === turmaId);
if (!turmaSelecionada) {
    alert('Turma não encontrada!');
    window.location.href = 'index.html'; // Redireciona para index.html se a turma não for encontrada
} else {
    document.getElementById('nomeTurmaAtividade').textContent = `Atividades - ${turmaSelecionada.nome}`;
}

// Exibir nome do professor
document.getElementById('nomeProfessor').textContent = professor.nome;

// Função para listar atividades
function listarAtividades() {
    const atividadesList = document.getElementById('atividadesList');
    atividadesList.innerHTML = '';

    const atividadesTurma = atividades[turmaId] || [];

    // Ordena as atividades pela descrição
    atividadesTurma.sort((a, b) => a.descricao.localeCompare(b.descricao));

    atividadesTurma.forEach((atividade, index) => {
        const atividadeItem = document.createElement('div');
        atividadeItem.className = 'atividade-item';
        atividadeItem.innerHTML = `${index + 1}. ${atividade.descricao}`;
        atividadesList.appendChild(atividadeItem);
    });

    // Mensagem se não houver atividades
    if (atividadesTurma.length === 0) {
        atividadesList.innerHTML = '<p>Não há atividades cadastradas para esta turma.</p>';
    }
}

// Exibir modal para cadastrar atividade
document.getElementById('cadastroAtividadeButton').onclick = function() {
    document.getElementById("cadastroAtividadeModal").style.display = "block";
}

// Fechar o modal
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.onclick = function() {
        document.getElementById("cadastroAtividadeModal").style.display = "none";
    }
});

// Evento do botão "Salvar" para cadastrar a atividade
document.getElementById('salvarAtividade').addEventListener('click', () => {
    const descricaoAtividade = document.getElementById('descricaoAtividade').value.trim();

    if (!descricaoAtividade) {
        alert("A descrição da atividade não pode estar vazia.");
        return;
    }

    const id = String(Date.now()); // Gera um ID único
    if (!atividades[turmaId]) {
        atividades[turmaId] = [];
    }
    atividades[turmaId].push({ id, descricao: descricaoAtividade });

    listarAtividades();

    // Limpa o campo de descrição e fecha o modal
    document.getElementById('descricaoAtividade').value = '';
    document.getElementById("cadastroAtividadeModal").style.display = "none";
});

// Evento do botão "Cancelar" para fechar o modal
document.getElementById('cancelarAtividade').addEventListener('click', () => {
    document.getElementById("cadastroAtividadeModal").style.display = "none"; // Fecha o modal
});

// Evento do botão de voltar
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'principal.html';
});

// Listar atividades ao carregar a página
listarAtividades();
