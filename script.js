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
    listaTarefas.replaceChildren();

    tarefas.forEach(function(tarefa, indice) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = tarefa.texto;
        if (tarefa.concluida) {
            colunaNome.classList.add("text-decoration-line-through");
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluida) {
            colunaStatus.innerHTML = '<span class="badge bg-success">Concluída</span>';
        } else {
            colunaStatus.innerHTML = '<span class="badge bg-warning">Pendente</span>';
        }

        const colunaAcoes = document.createElement("td");
        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent =
            tarefa.concluida 
            ? "Reabrir" 
            : "Concluir";
    botaoConcluir.classList.add(
        "btn",
        tarefa.concluida 
        ? "btn-warning"
        : "btn-success",
        "btn-sm",
        "me-2"
    );

    botaoConcluir.addEventListener(
        "click",
        function() {
            AlternarStatusTarefa(tarefa.id);
        }
    );

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("btn", "btn-primary", "me-2");

        const b = document.createElement("button");

        colunaAcoes.appendChild(botaoConcluir);


        linha.appendChild(colunaNumero);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);

        listaTarefas.appendChild(linha);
    });

    contador.textContent = tarefas.length === 1
        ? "1 tarefa"
        : `${tarefas.length} tarefas`;
}


function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas));
    renderizarTarefas();
 }

function AlternarStatusTarefa(id) {
    tarefas.forEach(function(tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
    });
    salvarTarefa();
}

renderizarTarefas();
