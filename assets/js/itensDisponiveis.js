import { itens } from "../mocks/itens.js";

// script que cria a lista de itens disponíveis, exibida na página de cadastro de itens
let p = document.querySelector(".itens");
let cont = 0;
itens.forEach(item => { 
    p.innerHTML += `<li class="item"> ${item.nome} - ${item.peso}kg</li>`;
    cont++;
});