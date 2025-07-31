let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

function salvar() {
  localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
}

function adicionarDisciplina() {
  const input = document.getElementById("novaDisciplina");
  const nome = input.value.trim();
  if (nome === "") return;

  const nova = {
    nome: nome,
    tarefas: []
  };
  disciplinas.push(nova);
  salvar();
  input.value = "";
  renderDisciplinas();
}

function adicionarTarefa(index) {
  const tarefa = prompt("Digite a nova tarefa para " + disciplinas[index].nome);
  if (!tarefa) return;
  disciplinas[index].tarefas.push(tarefa);
  salvar();
  renderDisciplinas();
}

function renderDisciplinas() {
  const lista = document.getElementById("listaDisciplinas");
  const areaTarefas = document.getElementById("areaTarefas");
  lista.innerHTML = "";
  areaTarefas.innerHTML = "";

  disciplinas.forEach((d, i) => {
    const li = document.createElement("li");
    li.textContent = d.nome;
    li.onclick = () => adicionarTarefa(i);
    lista.appendChild(li);

    const bloco = document.createElement("div");
    bloco.innerHTML = `<h3>${d.nome}</h3><ul>${d.tarefas.map(t => `<li>${t}</li>`).join('')}</ul>`;
    areaTarefas.appendChild(bloco);
  });
}

renderDisciplinas();
