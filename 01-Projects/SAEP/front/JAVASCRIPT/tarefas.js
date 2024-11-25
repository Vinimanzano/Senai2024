const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");
const modalAdicionarTarefa = document.getElementById("modalAdicionarTarefa");
const fecharModal = document.getElementById("fecharModal");
const salvarTarefa = document.getElementById("salvarTarefa");
const novaTarefaInput = document.getElementById("novaTarefa");
const tarefasAFazerLista = document.getElementById("tarefas-a-fazer-lista");
const tarefasConcluidasLista = document.getElementById("tarefas-concluidas-lista");

// Função para abrir o modal
btnAdicionarTarefa.addEventListener("click", () => {
  modalAdicionarTarefa.classList.add("active");
});

// Fechar modal
fecharModal.addEventListener("click", () => {
  modalAdicionarTarefa.classList.remove("active");
});

// Função para adicionar a tarefa na lista de "Tarefas a Fazer"
salvarTarefa.addEventListener("click", () => {
  const tarefaTexto = novaTarefaInput.value.trim();
  if (tarefaTexto) {
    const tarefaItem = criarTarefa(tarefaTexto);
    tarefasAFazerLista.appendChild(tarefaItem);
    novaTarefaInput.value = "";
    modalAdicionarTarefa.classList.remove("active");
  } else {
    alert("Digite o nome da tarefa!");
  }
});

// Função para criar o item de tarefa
function criarTarefa(tarefaTexto) {
  const li = document.createElement("li");
  li.textContent = tarefaTexto;

  // Botões de ação
  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "Concluir";
  btnConcluir.addEventListener("click", () => {
    tarefasAFazerLista.removeChild(li);
    tarefasConcluidasLista.appendChild(li);
    btnConcluir.textContent = "Concluída";
    btnConcluir.disabled = true;
  });

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      li.remove();
    }
  });

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.addEventListener("click", () => {
    const inputEditar = document.createElement("input");
    inputEditar.value = li.firstChild.textContent;
    li.firstChild.replaceWith(inputEditar);
    
    btnEditar.textContent = "Salvar";
    btnEditar.removeEventListener("click", arguments.callee);
    btnEditar.addEventListener("click", () => {
      li.firstChild.replaceWith(document.createTextNode(inputEditar.value));
      btnEditar.textContent = "Editar";
    });
  });

  li.appendChild(btnConcluir);
  li.appendChild(btnEditar);
  li.appendChild(btnExcluir);

  return li;
}
