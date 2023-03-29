import { verificaDistancia } from "../functions/verificaDistancia.js";
import { calculaFrete } from "../functions/calculaFrete.js";
import { verificaCidade } from "../functions/verificaCidade.js";
import {
  calculaTransporte,
  salvaTransporte,
} from "../functions/salvaTransporte.js";
import { calculaPeso } from "../functions/verificaTransporte.js";

// botão de envio do formulário
const btn = document.querySelector(".btn");

// evento disparado ao clicar o botão
btn.addEventListener("click", (e) => {
  e.preventDefault();

  // cria um array para armazenar os relatórios
  let relatorios = [];

  // pega o objeto que contém as cidades de saída e destino nos arquivos locais do navegador
  let cidades = localStorage.getItem("cidades");
  cidades = JSON.parse(cidades);
  const saida = cidades[0];
  const destino = cidades[1];

  // pega o objeto que contém os produtos nos arquivos locais do navegador
  let produtos = localStorage.getItem("itens");
  produtos = JSON.parse(produtos);

  // distância entre a saída e a parada
  let distancia = verificaDistancia(saida, destino);

  // div onde seram exibidos os relatórios
  let result = document.querySelector(".result");

  result.innerHTML = "";

  // campo que identifica a parada
  let parada = document.querySelector("#parada");
  parada = parada.value;

  // verifica se a cidade existe
  parada = verificaCidade(parada);

  if (!parada) {
    result.innerHTML = "A cidade de parada não está disponível";
  } else {
    // insere o relatório entre a saída e a parada no array de relatórios
    relatorios.push(calculaFrete(saida, parada, produtos, distancia));

    let trecho1 = calculaTransporte(saida, parada, produtos, distancia);

    // atualiza a quantidade de cada item que irá seguir até o destino final
    produtos.forEach((produto) => {
      produto.qtdItem = document.querySelector(
        `#produto-${produto.itemId}`
      ).value;
    });

    // atualiza o peso total de cada tipo de produto
    produtos.forEach((produto) => {
      produto.pesoTotal = calculaPeso(produto.itemId, produto.qtdItem);
    });

    // calcula a distância entre a parada e o destino final
    distancia = verificaDistancia(parada, destino);

    // insere o relatório entre a parada e o destino final no array de relatórios
    relatorios.push(calculaFrete(parada, destino, produtos, distancia));

    let trecho2 = calculaTransporte(parada, destino, produtos, distancia);

    salvaTransporte(trecho1, trecho2);

    // exibe os relatórios no html
    relatorios.forEach((relatorio) => {
      result.innerHTML += `${relatorio} <br> <br>`;
    });
  }
});
