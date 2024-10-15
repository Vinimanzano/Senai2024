const novoequipamento = document.querySelector('.btn-equipamento');
const modal = document.querySelector('.modal');
const modal_equip = document.querySelector('.modal_equip');
const modal_comments = document.querySelector('.modal_comments')
const overlay = document.querySelector('.overlay');
const equipamentos = document.querySelectorAll('.all')
const novocomentario = document.querySelector('.comment')



function modalcreatequip() {
    overlay.classList.toggle('none');
    modal_equip.classList.toggle('none');
}

novoequipamento.addEventListener('click', () => {
    modalcreatequip();
});

function modalComments() {
    overlay.classList.toggle('none');
    modal_comments.classList.toggle('none');
}

novocomentario.addEventListener('click', () => {
    modalComments();
});

async function fetchEquipamentos() {
    try {
        const response = await fetch('http://localhost:3000/equipamentos');
        const data = await response.json();
        console.log('Equipamentos carregados:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
    }
}

function renderEquipamentos(equipamentos) {
    const equipamentosContainer = document.querySelector('.all');

    equipamentos.forEach((equipamento) => {
        const div = document.createElement('div');
        div.classList.add('all');

        const img = document.createElement('img');
        img.src = `../assets/${equipamento.imagem}`;
        img.classList.add('imgg');

        const p = document.createElement('p');
        p.textContent = equipamento.descricao;

        const btn = document.createElement('button');
        btn.classList.add('del');
        btn.innerHTML = '<i class="bi bi-trash3-fill"></i>';

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(btn);
        equipamentosContainer.appendChild(div);
    });
        
}

async function DelEquipamentos(id) {
    try {
        const response = await fetch(`http://localhost:3000/equipamentos/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Equipamento com ID ${id} excluído com sucesso!`);
            fetchEquipamentos();
        } else {
            throw new Error(`Erro ao excluir equipamento: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

function adicionarEventosDeletar() {
    const botoesDeletar = document.querySelectorAll('.del');

    botoesDeletar.forEach((botao) => {
        botao.addEventListener('click', () => {
            const equipamentoId = botao.closest('.all').dataset.id;
            DelEquipamentos(equipamentoId); 
        });
    });
}

window.onload = async () => {
    await fetchEquipamentos();
    adicionarEventosDeletar();
};
