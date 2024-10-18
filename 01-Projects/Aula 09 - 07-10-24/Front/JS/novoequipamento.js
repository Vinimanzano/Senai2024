// Função para atualizar o status do checkbox
function updateStatus() {
    const checkbox = document.getElementById('checkbox');
    const statusText = document.getElementById('status');
    
    if (checkbox.checked) {
        statusText.textContent = 'Ativo';
    } else {
        statusText.textContent = 'Não ativo';
    }
}

// Adiciona o evento de mudança ao checkbox
document.getElementById('checkbox').addEventListener('change', updateStatus);

// Adiciona o evento de envio ao formulário
const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verifica o status do checkbox
    const status = form.checkbox.checked ? 'ativo' : 'desativo';

    // Cria o objeto equipamento com os dados do formulário
    const equipamento = {
        nome: form.nome.value,
        imagem: form.imagem.value,
        descricao: form.descricao.value,
        status: status,
    };

    console.log(equipamento);

    try {
        // Envia os dados para o servidor
        const response = await fetch('http://localhost:3000/equipamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipamento)
        });

        // Verifica se a resposta é OK
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        // Aguarda a resposta em JSON
        const data = await response.json();
        
        // Redireciona para a página de equipamentos
        window.location.href = 'equipamentos.html';
        console.log(data);
    } catch (error) {
        console.error("Erro ao enviar o equipamento:", error);
    }
});
