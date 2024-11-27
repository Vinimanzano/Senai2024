const uri = "http://localhost:3000/";

const conteiner = document.getElementById("conteiner");
const entradas = document.getElementById("entradas");
const saidas = document.getElementById("saidas");
const totEntradas = document.getElementById("totEntradas");
const totSaidas = document.getElementById("totSaidas");
const satual = document.getElementById("satual");
const santerior = document.getElementById("santerior");
const sdia = document.getElementById("sdia");
const data = document.getElementById("data");
var usuarios = [];
var lancamentos = [];

//Listar os usuários
fetch(uri + "usuarios")
    .then((resp) => resp.json())
    .then((resp) => {
        usuarios = resp;
    });
//Listar os lançamentos
fetch(uri + "lancamentos")
    .then((resp) => resp.json())
    .then((resp) => {
        lancamentos = resp;
    });

//Cadastrar os usuários (Tela01)
function novoUsuario() {
    conteiner.innerHTML = `
    <form id="novoUsuario">
        <h2>Novo Usuário</h2>
        <input type="text" name="nome" placeholder="Digite o nome" required>
        <input type="email" name="email" placeholder="Digite o Email" required>
        <button type="submit">Cadastrar</button>
    </form>`;
    const novoUsuario = document.getElementById("novoUsuario");
    novoUsuario.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = {
            nome: novoUsuario.nome.value,
            email: novoUsuario.email.value,
        };
        fetch(uri + "usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        })
            .then((resp) => resp.status)
            .then((status) => {
                if (status === 201) {
                    alert("Usuário cadastrado com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao cadastrar usuário!");
                }
            });
    });
}

//Cadastrar os lançamentos (Tela02)
function novoLancamento() {
    conteiner.innerHTML = `
    <form id="novoLancamento">
        <h2>Novo Lançamento</h2>
        <select name="tipo">
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
        </select>
        <input type="text" name="descricao" placeholder="Digite a descricao" required>
        <input type="number" step="0.01" name="valor" placeholder="0.00" required>
        <select name="usuario">${usuarios.map(usuario => `<option value="${usuario.id}">${usuario.nome}</option>`)}
        </select>
        <button type="submit">Cadastrar</button>
    </form>`;
    const novoLancamento = document.getElementById("novoLancamento");
    novoLancamento.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = {
            usuario: Number(novoLancamento.usuario.value),
            descricao: novoLancamento.descricao.value,
            tipo: novoLancamento.tipo.value,
            valor: Number(novoLancamento.valor.value),
        };
        fetch(uri + "lancamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        })
            .then((resp) => resp.status)
            .then((status) => {
                if (status === 201) {
                    alert("Lançamento cadastrado com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao cadastrar lançamento!");
                }
            });
    });
}

//Listar os lançamentos da data (Tela03)
function listarLancamentos(data) {
    entradas.innerHTML = "";
    saidas.innerHTML = "";
    if(data == undefined) data = new Date().toISOString().split("T")[0];
    fetch(uri + "lancamentos/" + data)
        .then((resp) => resp.json())
        .then((resp) => {
            resp.forEach(l => {
                if (l.tipo === "entrada") {
                    entradas.innerHTML += `<div class="card">
                    <div class="areas">
                        <p>Descrição: ${l.descricao}</p>
                        <p>Valor: R$ ${l.valor}</p>
                        <p>Data: ${new Date(l.data).toLocaleDateString("pt-BR")}</p> 
                        <p>Hora: ${new Date(l.data).toLocaleTimeString("pt-BR")}</p>
                    </div>
                    <div class="areas">
                        <button onclick="editarLancamento(${l.id})">Editar</button>
                        <button class="excluir" onclick="excluirLancamento(${l.id})">Excluir</button>
                    </div>
                    </div>`;
                } else {
                    saidas.innerHTML += `<div class="card">
                    <div class="areas">
                        <p>Descrição: ${l.descricao}</p>
                        <p>Valor: R$ ${l.valor}</p>
                        <p>Data: ${new Date(l.data).toLocaleDateString("pt-BR")}</p> 
                        <p>Hora: ${new Date(l.data).toLocaleTimeString("pt-BR")}</p>
                    </div>
                    <div class="areas">
                        <button onclick="editarLancamento(${l.id})">Editar</button>
                        <button class="excluir" onclick="excluirLancamento(${l.id})">Excluir</button>
                    </div>
                    </div>`;
                }
            });
        });
}
// Editar lançamento
function editarLancamento(id) {
    const lancamento = lancamentos.find((l) => l.id === id);
    conteiner.innerHTML = `
    <form id="editarLancamento">
        <h2>Editar Lançamento</h2>
        <select name="tipo">
            <option value="entrada" ${lancamento.tipo === "entrada" ? "selected" : ""}>Entrada</option>
            <option value="saida" ${lancamento.tipo === "saida" ? "selected" : ""}>Saída</option>
        </select>
        <input type="text" name="descricao" value="${lancamento.descricao}" required>
        <input type="number" step="0.01" name="valor" value="${lancamento.valor}" required>
        <button type="submit">Salvar</button>
    </form>`;
    const editarLancamento = document.getElementById("editarLancamento");
    editarLancamento.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = {
            tipo: editarLancamento.tipo.value,
            descricao: editarLancamento.descricao.value,
            valor: Number(editarLancamento.valor.value),
        };
        fetch(uri + "lancamentos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        })
            .then((resp) => resp.status)
            .then((status) => {
                if (status === 200) {
                    alert("Lançamento editado com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao editar lançamento!");
                }
            });
    });
}

// Excluir lançamento
function excluirLancamento(id) {
    if (confirm("Tem certeza que deseja excluir este lançamento?")) {
        fetch(uri + "lancamentos/" + id, {
            method: "DELETE",
        })
            .then((resp) => resp.status)
            .then((status) => {
                if (status === 200) {
                    alert("Lançamento excluído com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao excluir lançamento!");
                }
            });
    }
}

// Calcular totais e saldos
function atualizarTotais() {
    let totalEntradas = 0;
    let totalSaidas = 0;

    lancamentos.forEach((l) => {
        if (l.tipo === "entrada") {
            totalEntradas += l.valor;
        } else if (l.tipo === "saida") {
            totalSaidas += l.valor;
        }
    });

    totEntradas.innerHTML = `<h3>Total Entradas: R$ ${totalEntradas.toFixed(2)}</h3>`;
    totSaidas.innerHTML = `<h3>Total Saídas: R$ ${totalSaidas.toFixed(2)}</h3>`;

    const saldoAnterior = Number(santerior.value) || 0;
    const saldoAtual = saldoAnterior + totalEntradas - totalSaidas;

    satual.value = saldoAtual.toFixed(2);

    const saldoDoDia = totalEntradas - totalSaidas;
    sdia.value = saldoDoDia.toFixed(2);
}

// Atualizar a lista de lançamentos e os totais ao carregar a página
window.onload = () => {
    listarLancamentos();
    atualizarTotais();
};
