const URI = "http://localhost:8080/api/turma";
const nome = JSON.parse(window.localStorage.getItem("userData")).nome;
console.log(nome)

function parse() {
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    return userData;
}

const professornome = document.querySelector(".professornome");

professornome.innerHTML = `Olá, ${nome}!`;

function sair() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}


