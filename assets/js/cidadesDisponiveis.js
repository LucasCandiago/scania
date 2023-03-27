import { cidades } from "../mocks/cidades.js";

// script que cria a lista de cidades disponíveis, exibida nas páginas de cadastro de rota

let p = document.querySelector(".cidades");
let cont = 0;
cidades.forEach((cidade) => {
  p.innerHTML += `<li class="cidade"> ${cidade.nome}</li>`;
  cont++;
});
