const buttons = document.querySelectorAll('.btn');
const formulario = document.querySelector('#form-senha');
const button_clean = document.querySelector('.clean');
const enviar = document.querySelector('.enviar');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.innerHTML;
        formulario.senha.value += value;
    })
});

button_clean.addEventListener('click', () =>{
    formulario.senha.value = '';
})

enviar.addEventListener('click', () => {
    const senha = formulario.senha.value;
    fetch ('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(data => {
        const user = data.find((user) => user.senha === senha);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'equipamentos.html';
        } else {
            alert('Senha Incorreta');
        }
    })
})

