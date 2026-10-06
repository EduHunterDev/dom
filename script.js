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
    tarefas.push(novaTarefa);
    salvarTarefa();
    inputTarefa.value = "";
    inputTarefa.focus();
    console.log(tarefas);
    
}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas));
    }