function getCurrentYear() {
    return new Date().getFullYear();
}

function updateCopyright() {
    const year = getCurrentYear();
    const copyrightText = `Copyright © ${year} Livro Caixa | Todos os Direitos Reservados.`;
    document.getElementById("copyright").innerHTML = copyrightText;
}

updateCopyright();