// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");

//Resgate de tarefas do localStorage
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

//Ouvir e agir sobre o Clique 
form.addEventListener("submit", adicionarTarefa); 

// Função para adicionar tarefa
function adicionarTarefa(event) {
event.preventDefault();
    const texto = inputTarefa.value.trim();
    if (texto === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }
    const novatarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };
    tarefas.push(novatarefa);
    salvarTarefa();
    inputTarefa.value = "";
    inputTarefa.focus();
    console.log(tarefas);
    
}

function renderizarTarefas() {
    tarefas.forEach(function(tarefa, indece) {

    const linha = document.createElement("tr");

    const colunaNumero = document.createElement("td");
    colunaNumero.textContent = indece + 1;

    const colunaNome = document.createElement("td");
    colunaNome.textContent = tarefa.texto;
    "text-muted"
    });
}

    const colunaStatus = document.createElement("td");
    if (tarefa.concluida) {
        colunaStatus.innerHTML = '<span class="badge bg-success">Concluída</span>';
    } else {
        colunaStatus.innerHTML = '<span class="badge bg-warning">Pendente</span>';
    }

    linha.appendChild(colunaNumero);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaStatus);
 
    listaTarefas.appendChild(linha);


function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas));
 }

