import { calculaPeso } from "../functions/verificaTransporte.js";

// código JavaScript responsável pela página cadastrarItens.html

// botão que envia o formulário
const btn = document.querySelector(".btn");

// evento criado ao clicar no botão
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const itens = [];

  // pega o elemento html que se refere ao nome dos itens
  const itensElements = document.querySelectorAll("#itens");

  // pega o elemento html que se refere à quantidade dos itens
  const qtdItensElements = document.querySelectorAll("#qtd");

  // criação da lista de itens para o transporte
  itensElements.forEach((item, key) => {
    itens[key] = {
        id: key,
        itemId: item.value,
        qtdItem: 0,
        pesoTotal: 0,
    };
  });

  // cadastro da quantidade de itens transportados
  qtdItensElements.forEach((item, key) => {
    itens[key].qtdItem = item.value;
  })

  // cálculo do peso total dos itens transportados
  itens.forEach(item => {
    item.pesoTotal = calculaPeso(item.itemId, item.qtdItem);
  })

  // armazenamento dos itens transportados nos arquivos locais do navegador
  const itensJSON = JSON.stringify(itens);
  localStorage.setItem("itens", itensJSON);

  // âncora para a página de criação da rota do envio
  document.location.href = "./rota.html";
});
