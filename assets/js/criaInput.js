import { itens } from "../mocks/itens.js";

// botão que adiciona novos campos
const addBtn = document.querySelector(".add");

// função que deleta um campo
export function removerInput(el) {
  el.parentElement.remove();
}

// função que cria o select dos itens
function criaSelect(lista) {
  const options = [];
  lista.forEach((item) => {
    let select = document.createElement("option");
    select.innerHTML = item.nome;
    select.setAttribute("value", item.id);
    options.push(select);
  });

  return options;
}

// evento de criação de novos campos, disparado ao clicar no botão de adicionar produto
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const div = document.querySelector(".itens-div");

  const box = document.createElement("div");
  box.setAttribute("class", "box");

  const label = document.createElement("label");
  const input = document.createElement("select");
  const remove = document.createElement("button");
  const qtdInput = document.createElement("input");
  const labelQtd = document.createElement("label");

  const options = criaSelect(itens);

  label.innerHTML = "Item:";
  label.setAttribute("for", "itens");

  input.setAttribute("id", "itens");

  qtdInput.setAttribute("type", "number");
  qtdInput.setAttribute("id", "qtd");

  labelQtd.innerHTML = "Quantidade:";

  remove.setAttribute("style", "background-color: red;");
  remove.innerHTML = "Remover Item";

  remove.addEventListener("click", (e) => {
    e.preventDefault();
    removerInput(remove);
  });

  options.forEach((option) => {
    input.appendChild(option);
  });

  box.appendChild(label);
  box.appendChild(input);
  box.appendChild(labelQtd);
  box.appendChild(qtdInput);
  box.appendChild(remove);

  div.appendChild(box);
});
