import { itens } from "../mocks/itens.js";

// pega os itens armazenados nos arquivos locais do navegador
let produtos = localStorage.getItem("itens");
produtos = JSON.parse(produtos);

// div onde seram exibidos os campos dos itens
const div = document.querySelector(".itens-div");

// percorre os itens da lista, para criar um campo para cada um no formulário
produtos.forEach(produto => {

    // descobre o nome do produto
    produto.nome = itens.find(p => p.id == produto.itemId).nome;

    // cria uma div para cada produto
    const box = document.createElement("div");
    box.setAttribute("class", "box");
    
    // cria os campos
    const label = document.createElement("label");
    const input = document.createElement("input");
    
    // identifica qual item se trata o campo
    label.innerHTML = `${produto.nome}: `;
    label.setAttribute("for", `produto-${produto.itemId}`);
    
    input.setAttribute("id", `produto-${produto.itemId}`);
    input.setAttribute("type", "number");
    input.setAttribute("value", produto.qtdItem)
    
    // adiciona os campos à pagina html
    box.appendChild(label);
    box.appendChild(input);
    
    div.appendChild(box);
})