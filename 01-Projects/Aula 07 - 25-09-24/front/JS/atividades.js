const URI = "http://localhost:8080/api/atividade";

async function fetchAtividades() {
    const urlParams = new URLSearchParams(window.location.search);
    const turmaId = parseInt(urlParams.get('id'));

    if (!turmaId) {
        console.error("ID da turma não encontrado. Verifique a URL.");
        return;
    }

    const userData = JSON.parse(window.localStorage.getItem("userData"));
    const professorNome = userData ? userData.nome : 'Professor não identificado';
    document.getElementById("professorNome").innerText = `Professor: ${professorNome}`;

    try {
        const turmaResponse = await fetch(`${URI}/turma/${turmaId}`); 
        if (!turmaResponse.ok) {
            throw new Error(`Erro HTTP ao buscar atividades: ${turmaResponse.status}`);
        }

        const atividades = await turmaResponse.json();

        document.getElementById("nomeTurma").innerText = `Atividades da Turma: ${turmaId}`;

        const tabela = document.querySelector("#atividadeTable");
        tabela.innerHTML = '';

        atividades.forEach((atividade, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${atividade.descricao}</td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar atividades:", error);
    }
}

async function saveAtividade() {
    const descricaoAtividade = document.getElementById("atividadeDescricao").value;
    const urlParams = new URLSearchParams(window.location.search);
    const turmaId = parseInt(urlParams.get('id'));

    if (!descricaoAtividade || !turmaId) {
        alert("Descrição da atividade ou ID da turma não fornecido.");
        return;
    }

    try {
        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descricao: descricaoAtividade, turma: turmaId }),
        });

        if (response.ok) {
            console.log("Atividade cadastrada com sucesso");
            fecharModal();
            await fetchAtividades();
        } else {
            throw new Error(`Erro ao cadastrar atividade: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar atividade:", error);
        alert("Não foi possível cadastrar a atividade. Tente novamente mais tarde.");
    }
}

function visualizarTurma(id) {
    console.log(`Visualizar turma com ID: ${id}`);
    window.location.href = `atividades.html?id=${id}`;
}

function abrirModal() {
    document.getElementById("modalCadastrarAtividade").style.display = "block";
}

function fecharModal() {
    document.getElementById("modalCadastrarAtividade").style.display = "none";
}

function voltar() {
    window.location.href = 'professor.html';
}

window.onload = fetchAtividades;
