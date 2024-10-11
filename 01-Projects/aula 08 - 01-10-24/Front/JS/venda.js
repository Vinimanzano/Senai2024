let areaAtual = 10;
let modeloAtual = 'Vendas';

async function buscarClientes() {
    try {
        const response = await fetch('http://localhost:3000/clientes');
        if (!response.ok) {
            throw new Error('Erro ao buscar clientes');
        }
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function buscarConcessionarias() {
    try {
        const response = await fetch(`http://localhost:3000/concessionarias?area=${areaAtual}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar concessionárias');
        }
        const concessionarias = await response.json();
        return concessionarias;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function preencherClientes() {
    const clienteSelect = document.getElementById('cliente');
    clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
    
    const clientes = await buscarClientes();
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
}

async function preencherConcessionarias() {
    const concessionariaSelect = document.getElementById('concessionaria');
    concessionariaSelect.innerHTML = '<option value="">Selecione uma concessionária</option>';
    
    const concessionariasDaArea = await buscarConcessionarias();
    
    if (concessionariasDaArea.length > 0) {
        concessionariasDaArea.forEach(concessionaria => {
            const option = document.createElement('option');
            option.value = concessionaria.id;
            option.textContent = concessionaria.nome;
            concessionariaSelect.appendChild(option);
        });
    } else {
        concessionariaSelect.innerHTML = '<option value="">Nenhuma concessionária disponível</option>';
    }
}

function verificarCampos() {
    const cliente = document.getElementById('cliente').value;
    const concessionaria = document.getElementById('concessionaria').value;
    const confirmarBtn = document.getElementById('confirmar-btn');

    confirmarBtn.disabled = !(cliente && concessionaria);
}

function confirmarVenda() {
    const cliente = document.getElementById('cliente').value;
    const concessionaria = document.getElementById('concessionaria').value;
    
    if (cliente && concessionaria) {
        alert(`Venda confirmada para o cliente ID: ${cliente}, através da concessionária ID: ${concessionaria}.`);

        atualizarEstoque(modeloAtual, areaAtual);
    }
}

function atualizarEstoque(modelo, area) {
    console.log(`Estoque do modelo ${modelo} na área ${area} foi atualizado!`);
}

function fecharVenda() {
    document.querySelector('.modal-venda').style.display = 'none';
}

async function inicializarTelaVenda() {
    await preencherClientes();
    await preencherConcessionarias();
    document.getElementById('car-title').textContent = modeloAtual;
}

inicializarTelaVenda();
