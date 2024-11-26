let entradaTotal = 0;
let saidaTotal = 0;

function adicionarEntrada() {
    const valorEntrada = parseFloat(document.getElementById('entrada').value);
    if (!isNaN(valorEntrada) && valorEntrada > 0) {
        entradaTotal += valorEntrada;
        atualizarSaldo();
    } else {
        alert("Por favor, insira um valor válido para a entrada.");
    }
    document.getElementById('entrada').value = ''; 
}

function adicionarSaida() {
    const valorSaida = parseFloat(document.getElementById('saida').value);
    if (!isNaN(valorSaida) && valorSaida > 0) {
        saidaTotal += valorSaida;
        atualizarSaldo();
    } else {
        alert("Por favor, insira um valor válido para a saída.");
    }
    document.getElementById('saida').value = ''; 
}

function atualizarSaldo() {
    const saldoDia = entradaTotal - saidaTotal;
    const saldoElement = document.getElementById('saldo-dia');
    const totalElement = document.getElementById('total');

    // Atualizar o saldo do dia
    saldoElement.textContent = `R$ ${saldoDia.toFixed(2)}`;
    totalElement.textContent = `R$ ${(entradaTotal - saidaTotal).toFixed(2)}`;

    // Atualizar a cor do saldo
    if (saldoDia >= 0) {
        saldoElement.style.color = 'blue';  // Azul para saldo positivo
    } else {
        saldoElement.style.color = 'red';  // Vermelho para saldo negativo
    }
}

function mostrarFormUsuario() {
    document.getElementById('formUsuario').style.display = 'flex';
}

function mostrarFormLancamento() {
    document.getElementById('formLancamento').style.display = 'flex';
}

function fecharFormUsuario() {
    document.getElementById('formUsuario').style.display = 'none';
}

function fecharFormLancamento() {
    document.getElementById('formLancamento').style.display = 'none';
}

function salvarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    if (nome && email) {
        alert('Usuário salvo: ' + nome + ' - ' + email);
        fecharFormUsuario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function cadastrarLancamento() {
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const usuario = document.getElementById('usuarioLancamento').value;
    const valor = document.getElementById('valorLancamento').value;

    if (descricao && usuario && valor) {
        alert('Lançamento cadastrado: ' + tipo + ' - ' + descricao + ' - R$ ' + valor);
        fecharFormLancamento();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}