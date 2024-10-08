const URI = "http://localhost:8080/api/turma";
const nome = JSON.parse(window.localStorage.getItem("userData")).nome; 
const idProfessor = JSON.parse(window.localStorage.getItem("userData")).id;

try {
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    if (userData && userData.nome && userData.id) { 
        const professornome = document.querySelector(".professornome");
        professornome.innerHTML = `Olá, ${nome}!`;
    } else {
        throw new Error("Nome ou ID do usuário não encontrado.");
    }
} catch (error) {
    console.error("Erro ao obter nome do usuário:", error);
    window.location.href = 'login.html';
}

function sair() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

async function fetchTurmas() {
    try {
        const response = await fetch(`${URI}/${idProfessor}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const turmas = await response.json();

        const tabela = document.querySelector("#turmaTable tbody");
        tabela.innerHTML = '';

        turmas.forEach((turma, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${turma.nome}</td>
                <td>
                    <button onclick="visualizarTurma(${turma.id})">Visualizar</button>
                    <button onclick="excluirTurma(${turma.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        alert("Não foi possível carregar as turmas. Tente novamente mais tarde.");
    }
}

function cadastrarTurma() {
    document.getElementById("turmaModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("turmaModal").style.display = "none";
}

document.getElementById("turmaForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nomeTurma = document.getElementById("nomeTurma").value;

    try {
        const response = await fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: nomeTurma, professor: idProfessor }),
        });

        if (response.ok) {
            fecharModal();
            fetchTurmas();
        } else {
            throw new Error(`Erro ao cadastrar turma: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar turma:", error);
        alert("Não foi possível cadastrar a turma. Tente novamente mais tarde.");
    }
});

function visualizarTurma(id) {
    console.log(`Visualizar turma com ID: ${id}`);
    window.location.href = `atividades.html?id=${id}`;
}

async function excluirTurma(id) {
    try {
        const response = await fetch(`${URI}/${idProfessor}/${id}`, { 
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Turma com ID ${id} excluída com sucesso`);
            fetchTurmas();
        } else {
            throw new Error(`Erro ao excluir turma: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao excluir turma:", error);
        alert("Essa turma possui atividade e nao pode ser excluída!");
    }
}


window.onclick = function (event) {
    const modal = document.getElementById("turmaModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

window.onload = fetchTurmas;
