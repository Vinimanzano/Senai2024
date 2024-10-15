const  novoequipamento = document.querySelector('.btn-equipamento');
const modal = document.querySelector('.modal');
const modal_comment = document.querySelector('.modal_comment');
const overlay = document.querySelector('.overlay');

function modalComment(){
    overlay.classList.toggle('none')
    modal_comment.classList.toggle('none')
}

novoequipamento.addEventListener('click', () => {
    window.location.href = 'novoequipamento.html';
})