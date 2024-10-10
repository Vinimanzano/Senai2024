const mostrarDetalhesArea = async (areaNum) => {
    const modalArea = document.getElementById('modal-area');
    const areaTitle = document.getElementById('area-title');
    const carList = document.getElementById('car-list');
    const carCount = document.getElementById('car-count');
    const emptyMessage = document.getElementById('empty-message');
    const areas = document.querySelectorAll('.area');

    try {
        // Fazendo a requisição para a API
        const response = await fetch('http://localhost:3000/alocacao');
        const alocacoes = await response.json();

        // Exibindo os dados no console para verificação
        console.log(alocacoes);

        // Filtrando a alocação correspondente à área selecionada
        const alocacao = alocacoes.find(a => a.id === parseInt(areaNum));

        // Atualizando o título da área
        areaTitle.textContent = `Área ${areaNum}`;
        carList.innerHTML = ''; // Limpa a lista de carros

        // Atualizando as cores das áreas
        areas.forEach(area => {
            area.style.backgroundColor = area.getAttribute('data-area') === areaNum ? 'blue' : 'gray';
        });

        // Verificando se a alocação existe e se possui automóveis
        if (alocacao && alocacao.automovel && alocacao.automovel.length > 0) {
            carCount.textContent = `Quantidade de carros nesta área: ${alocacao.quantidade}`;
            emptyMessage.style.display = 'none'; 

            // Exibir detalhes dos automóveis
            alocacao.automovel.forEach(automovel => {
                const carItem = document.createElement('div');
                carItem.classList.add('car-item');
                carItem.innerHTML = `
                    <strong>Modelo:</strong> ${automovel.modelo}<br>
                    <strong>Preço:</strong> R$ ${automovel.preco.toFixed(2)}<br> 
                    <strong>Cliente:</strong> ${automovel.cliente ? automovel.cliente.nome : 'N/A'}<br>
                    <strong>Concessionária:</strong> ${automovel.concessionaria ? automovel.concessionaria.nome : 'N/A'}<br>
                    <button class="sell-button">Vender</button>
                `;

                // Adicionando evento de clique para o botão "Vender"
                const sellButton = carItem.querySelector('.sell-button');
                sellButton.addEventListener('click', () => {
                    // Adicione a lógica de venda aqui
                    alert(`Vender ${automovel.modelo}`);
                });

                carList.appendChild(carItem);
            });
        } else {
            emptyMessage.style.display = 'block'; 
            carCount.textContent = '';
        }

        // Mostrar o modal
        modalArea.style.display = 'block';

    } catch (error) {
        console.error('Erro ao buscar alocações:', error);
    }
};

// Função para fechar o modal
const closeModal = () => {
    const modalArea = document.getElementById('modal-area');
    modalArea.style.display = 'none';

    // Resetando as cores das áreas
    document.querySelectorAll('.area').forEach(area => {
        area.style.backgroundColor = 'gray';
    });
};

// Adicionando o evento de clique nas áreas
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('click', () => {
        const areaNum = area.getAttribute('data-area');
        mostrarDetalhesArea(areaNum);
    });
});

// Evento de clique para fechar o modal
document.querySelector('.close').addEventListener('click', closeModal);

// Fechando o modal ao clicar fora dele
window.onclick = function(event) {
    const modalArea = document.getElementById('modal-area');
    if (event.target === modalArea) {
        closeModal();
    }
};
