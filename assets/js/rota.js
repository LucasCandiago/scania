import { verificaCidade } from "../functions/verificaCidade.js";
import { verificaDistancia } from "../functions/verificaDistancia.js";
import { calculaFrete } from "../functions/calculaFrete.js";
import {
  calculaTransporte,
  salvaTransporte,
} from "../functions/salvaTransporte.js";

// botão de cálculo de frete entre 2 cidades
let send = document.querySelector(".btn-calcula");

// evento disparado ao clicar no botão de calcular
send.addEventListener("click", (e) => {
  e.preventDefault();
  let distancia;

  // campo onde será exibido o relatório
  let result = document.querySelector(".result");

  // elementos html do formulário
  let formSaida = document.querySelector("#saida");
  let formDestino = document.querySelector("#destino");

  result.innerHTML = "";

  // valores dos campos
  let saidaValue = formSaida.value;
  let destinoValue = formDestino.value;

  // verifica a existência das cidades de saída e destino
  let saida = verificaCidade(saidaValue);
  let destino = verificaCidade(destinoValue);

  // cálculo da distância entre as cidades, caso as duas estejam disponíveis para o frete
  if (saida && destino) {
    distancia = verificaDistancia(saida, destino);
  } else if (!saida) {
    result.innerHTML = "A cidade de saída não está disponível!";
  } else if (!destino) {
    result.innerHTML = "A cidade de destino não está disponível!";
  }

  // pega os itens armazenados nos arquivos locais do navegador
  const itensJSON = localStorage.getItem("itens");
  const produtos = JSON.parse(itensJSON);

  // exibe o relatório do frete entre essas duas cidades
  result.innerHTML = calculaFrete(saida, destino, produtos, distancia);

  // armazenamento das cidades nos arquivos locais do navegador
  const cidades = [saida, destino];
  const cidadesJSON = JSON.stringify(cidades);
  localStorage.setItem("cidades", cidadesJSON);

  // salva o transporte nos arquivos locais do navegador
  salvaTransporte(calculaTransporte(saida, destino, produtos, distancia));
});

// botão de adicionar parada
let btnParada = document.querySelector(".btn-parada");

// evento de redirecionamento para a página de cadastro de parada ao clicar no botão
btnParada.addEventListener("click", (e) => {
  e.preventDefault();
  let distancia;

  // campo onde será exibido o relatório
  let result = document.querySelector(".result");

  // elementos html do formulário
  let formSaida = document.querySelector("#saida");
  let formDestino = document.querySelector("#destino");

  result.innerHTML = "";

  // valores dos campos
  let saidaValue = formSaida.value;
  let destinoValue = formDestino.value;

  // verifica a existência das cidades de saída e destino
  let saida = verificaCidade(saidaValue);
  let destino = verificaCidade(destinoValue);

  // cálculo da distância entre as cidades, caso as duas estejam disponíveis para o frete
  if (saida && destino) {
    distancia = verificaDistancia(saida, destino);
  } else if (!saida) {
    result.innerHTML = "A cidade de saída não está disponível!";
  } else if (!destino) {
    result.innerHTML = "A cidade de destino não está disponível!";
  }

  // armazenamento das cidades nos arquivos locais do navegador
  const cidades = [saida, destino];
  const cidadesJSON = JSON.stringify(cidades);
  localStorage.setItem("cidades", cidadesJSON);

  document.location.href = `./parada.html`;
});
