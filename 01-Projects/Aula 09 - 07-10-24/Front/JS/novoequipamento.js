function updateStatus() {
    const checkbox = document.getElementById('checkbox');
    const statusText = document.getElementById('status');
    
    if (checkbox.checked) {
        statusText.textContent = 'Ativo';
    } else {
        statusText.textContent = 'Não ativo';
    }
}

document.getElementById('checkbox').addEventListener('change', updateStatus);

const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const status = form.checkbox.checked ? 'ativo' : 'desativo';

    const equipamento = {
        nome: form.nome.value,
        imagem: form.imagem.value,
        descricao: form.descricao.value,
        status: status,
    };

    console.log(equipamento);

    try {
        const response = await fetch('http://localhost:3000/equipamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipamento)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        window.location.href = 'equipamentos.html';
        console.log(data);
    } catch (error) {
        console.error("Erro ao enviar o equipamento:", error);
    }
});
