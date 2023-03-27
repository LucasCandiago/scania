import { verificaCidade } from "../functions/verificaCidade.js";
import { verificaDistancia } from "../functions/verificaDistancia.js";
import { verificaTransporte } from "../functions/verificaTransporte.js";
import { verificaPrecoTransporte } from "../functions/verificaTransporte.js";

// código JavaScript da página de consulta de um frete, determinando a distância e o tipo de caminhão

// botão que envia o formulário
let send = document.querySelector(".btn");

// evento criado ao clicar no botão
send.addEventListener("click", (e) => {
  e.preventDefault();
  let distancia;
  // elementos html do formulário
  let result = document.querySelector(".result");
  let formSaida = document.querySelector("#saida");
  let formDestino = document.querySelector("#destino");
  let formTransporte = document.querySelector("#transporte");

  result.innerHTML = "";

  // valores cadastrados no formulário
  let saidaValue = formSaida.value;
  let destinoValue = formDestino.value;
  let transporteId = formTransporte.value;

  // verificação da existência do transporte, cidade de saída e destino
  let transporte = verificaTransporte(transporteId);
  let saida = verificaCidade(saidaValue);
  let destino = verificaCidade(destinoValue);

  // cálculo da distância caso exista cidade de saida e destino
  if (saida && destino) {
    distancia = verificaDistancia(saida, destino);
  } else if (!saida) {
    result.innerHTML = "A cidade de saída não existe!";
  } else if (!destino) {
    result.innerHTML = "A cidade de destino não existe!";
  }

  // cálculo do preço
  let valor = verificaPrecoTransporte(transporteId, distancia);

  // relatório final exibido ao usuário
  result.innerHTML = `De ${saida.nome} para ${destino.nome}, utilizando um ${transporte}, a distância é de ${distancia}km e o custo será de ${valor}.
  `;
});
