const equipamentos = document.querySelectorAll('.all');
const main = document.querySelector('main');
const modal = document.querySelector('.modal');
const modal_equip = document.querySelector('#modal_equip');
const modal_comments = document.querySelector('#modal_comments')
const btn_equipamento = document.querySelector('.btn-equipamento');
const btn_comment = document.querySelectorAll('#btn-comment');
const overlay = document.querySelector('.overlay');
const user = JSON.parse(window.localStorage.getItem("user"));
const voltar = document.querySelector('.voltar');
var listaequip = [];

function verificarUsuario() {
    if (user.perfilId == 1) {
        voltar.innerHTML = `<a href="login.html"><i class="bi bi-box-arrow-in-right"></i></a>`;
    }
    fetchEquipamentos();
}

async function fetchEquipamentos() {
    listaequip = [];
    try {
        const response = await fetch('http://localhost:3000/equipamentos');
        const data = await response.json();
        data.forEach((e) => {
            listaequip.push(e);
        });

        if (user.perfilId == 1) {
            renderEquipamentosUsuarioComum();
        } else {
            renderEquipamentos();
        }
    } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
    }
}


async function fetchEquipamentos() {
    listaequip = [];
    try {
        const response = await fetch('http://localhost:3000/equipamentos');
        const data = await response.json();
        data.forEach ((e) =>{
            listaequip.push(e);
        })

        if (user.perfilId != 1) {
            renderEquipamentos();
            return;
        }

        renderEquipamentosUsuarioComum();
    } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
    }
}


function renderEquipamentos() {
    main.innerHTML = "";
    listaequip.forEach((e) => {
        const card = `
            <div>
                <div class="div-info-equip">
                    <img src="../assets/${e.imagem}" class="imgg">
                    <div class="all">
                        <p> 
                            ${e.equipamento}<br></br>
                            ${e.descricao}
                        </p>
                        <div class="all-btn">
                            <button class="btn-comment" id="btn-comment" onclick="comentario()"><i class="bi bi-chat-right-text-fill"></i></button>
                            <button class="del" id="del" onclick="del(${e.id})"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        main.innerHTML += card;
    })
}

function renderEquipamentosUsuarioComum() {
    listaequip.forEach((e) => {
        const card = `
            <div>
                <div class="div-info-equip">
                    <img src="../assets/${e.imagem}" class="imgg">
                    <div class="all">
                        <p> 
                            ${e.equipamento}
                            ${e.descricao}
                        </p>
                        <div class="all-btn">
                            <button class="btn-comment" id="btn-comment" onclick="comentario()"><i class="bi bi-chat-right-text-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        main.innerHTML += card;
    })
}

async function del(id) {
    await fetch(`http://localhost:3000/equipamentos/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        fetchEquipamentos();
    })
    .catch((error) => {
        console.error('Erro ao deletar equipamento:', error);
    });
}

function comentario() {
    window.location.href = "comentario.html";
}

function limparLocalStorage() {
    window.localStorage.clear();
}