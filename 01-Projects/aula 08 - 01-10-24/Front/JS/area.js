const modalArea = document.getElementById("modal-area");
const areaTitle = document.getElementById("area-title");
const carList = document.getElementById("car-list");
const carCount = document.getElementById("car-count");
const emptyMessage = document.getElementById("empty-message");
const areas = document.querySelectorAll(".area");
var listaCarros = [];

areas.forEach((area) => {
  area.addEventListener("click", async (e) => {
    listaCarros = [];
    const numAreaClicada = area.getAttribute("data-area");
    deixarAreaAzul(numAreaClicada);
    openModal();

    areaTitle.textContent = `Área ${numAreaClicada}`;
    carList.innerHTML = '';

    try {
      const response = await fetch(
        `http://localhost:3000/alocacao/${numAreaClicada}`
      );
      const alocacoes = await response.json();

      alocacoes.forEach((e) => {
        listaCarros.push(e.automovel);
      });

      console.log(listaCarros);

      if(listaCarros.length == 0) {
        emptyMessage.style.display = 'block'; 
        carCount.textContent = '';
        return;
      }

      carCount.textContent = `Quantidade de carros nesta área: ${listaCarros.length}`;
      emptyMessage.style.display = 'none'; 

      listaCarros.forEach((carro) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");
        carItem.innerHTML = `
                <strong>Modelo: ${carro.modelo}</strong><br>
                <strong>Preço: R$${carro.preco.toFixed(2)}</strong><br> 
                <button class="sell-button">Vender</button>
            `;
        carList.appendChild(carItem);

        const sellButton = carItem.querySelector(".sell-button");
        sellButton.addEventListener("click", () => {
          window.location.href = "venda.html";
        });
      });
    } catch (error) {
      console.log("Erro ao buscar automoveis da area!", error);
    }
  });
});

const closeModal = () => {
    modalArea.style.display = 'none';

    document.querySelectorAll('.area').forEach(area => {
      area.style.backgroundColor = 'gray';
    });
};

function openModal() {
  modalArea.style.display = 'block';
}

document.querySelector('.close').addEventListener('click', closeModal);

window.onclick = function(event) {
  if (event.target === modalArea) {
      closeModal();
  }
};

function deixarAreaAzul(area) {
  document.querySelector(`.area${area}`).style.backgroundColor = 'blue';
}