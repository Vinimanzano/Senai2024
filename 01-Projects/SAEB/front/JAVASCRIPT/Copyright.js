function getCurrentYear() {
    return new Date().getFullYear();
}

function updateCopyright() {
    const year = getCurrentYear();
    const copyrightText = `Copyright © ${year} Tarefas Rápidas | Todos os Direitos Reservados.`;
    document.getElementById("copyright").innerHTML = copyrightText;
}

updateCopyright();