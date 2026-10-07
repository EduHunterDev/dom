// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");
const botaoExportar = document.querySelector("#exportar-tarefas");

//Resgate de tarefas do localStorage
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

//Ouvir e agir sobre o Clique 
form.addEventListener("submit", adicionarTarefa); 
botaoExportar.addEventListener("click", exportarTarefas);

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
        colunaAcoes.classList.add("text-center");
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
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add(
            "btn",
            "btn-primary",
            "btn-sm",
            "me-2"
        );

        botaoEditar.addEventListener("click", function() {
            const novoTexto = prompt("Edite a tarefa:", tarefa.texto);
            if (novoTexto === null) {
                return;
            }

            const textoEditado = novoTexto.trim();
            if (textoEditado === "") {
                alert("A tarefa não pode ficar vazia.");
                return;
            }

            tarefa.texto = textoEditado;
            salvarTarefa();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add(
            "btn",
            "btn-danger",
            "btn-sm",
            "me-2"
        );

        botaoExcluir.addEventListener("click", function() {
            const confirmarExclusao = confirm(
                `Deseja excluir a tarefa "${tarefa.texto}"?`
            );
            if (!confirmarExclusao) {
                return;
            }

            const indiceTarefa = tarefas.findIndex(function(item) {
                return item.id === tarefa.id;
            });
            tarefas.splice(indiceTarefa, 1);
            salvarTarefa();
        });

        colunaAcoes.appendChild(botaoConcluir);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);

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

function exportarTarefas() {
    const linhas = [
        ["#", "Tarefa", "Status"],
        ...tarefas.map(function(tarefa, indice) {
            return [
                indice + 1,
                tarefa.texto,
                tarefa.concluida ? "Concluída" : "Pendente"
            ];
        })
    ];

    const conteudo = "\uFEFF" + linhas
        .map(function(linha) {
            return linha
                .map(function(valor) {
                    return `"${String(valor).replace(/"/g, '""')}"`;
                })
                .join(";");
        })
        .join("\r\n");
    const arquivo = new Blob([conteudo], {
        type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = "minhas-tarefas.csv";
    link.click();
    URL.revokeObjectURL(url);
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
