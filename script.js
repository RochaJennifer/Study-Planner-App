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

function excluirDisciplina(index) {
  const confirmar = confirm(`Tem certeza que deseja excluir a disciplina "${disciplinas[index].nome}"?`);
  if (confirmar) {
    disciplinas.splice(index, 1);
    salvar();
    renderDisciplinas();
  }
}

function adicionarTarefa(index) {
  const tarefa = prompt("Digite a nova tarefa para " + disciplinas[index].nome);
  if (!tarefa) return;
  disciplinas[index].tarefas.push(tarefa);
  salvar();
  renderDisciplinas();
}

function excluirTarefa(iDisciplina, iTarefa) {
  const confirmar = confirm(`Deseja excluir esta tarefa de "${disciplinas[iDisciplina].nome}"?`);
  if (confirmar) {
    disciplinas[iDisciplina].tarefas.splice(iTarefa, 1);
    salvar();
    renderDisciplinas();
  }
}

function renderDisciplinas() {
  const lista = document.getElementById("listaDisciplinas");
  const areaTarefas = document.getElementById("areaTarefas");
  lista.innerHTML = "";
  areaTarefas.innerHTML = "";

  disciplinas.forEach((d, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <span onclick="adicionarTarefa(${i})">${d.nome}</span>
  <button onclick="excluirDisciplina(${i})" class="btn-excluir">🗑️</button>
`;

    lista.appendChild(li);

   const tarefasHTML = d.tarefas.map((tarefa, j) => `
  <li>
    ${tarefa}
    <button onclick="excluirTarefa(${i}, ${j})" class="btn-excluir-tarefa">🗑️</button>
  </li>
`).join('');

const bloco = document.createElement("div");
bloco.innerHTML = `<h3>${d.nome}</h3><ul>${tarefasHTML}</ul>`;

    areaTarefas.appendChild(bloco);
  });
}

renderDisciplinas();
