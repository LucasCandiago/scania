import { veiculos } from "../mocks/veiculos.js";
import { itens } from "../mocks/itens.js";

// função que verifica no objeto dos veículos, qual veículo se trata, conforme o id
export function verificaTransporte(id) {
  let transporte = veiculos[id];

  return transporte.nome;
}

// função que verifica o preço do transporte conforme o id do veículo, distância e quantidade de veículos
export function verificaPrecoTransporte(id, distancia, qtd = 1) {
  let transporte = veiculos[id];
  let precoKm = transporte.preco * qtd;
  let preco = precoKm * distancia;

  return preco;
}

// função que calcula o peso total de uma categoria de item, por exemplo, a soma do peso de todos celulares
export function calculaPeso(item, qtd) {
  let peso = itens[item].peso * qtd;
  return peso;
}

// função que cria um objeto identificando um caminhão
export function criaCaminhao(id, qtdCaminhoes) {
  let caminhao = {
    id: qtdCaminhoes,
    caminhaoId: id,
  };

  return caminhao;
}

// função que determina os veículos que serão utilizados no transporte, visando o menor preço possível
export function escolheTransporte(pesoTotal) {
  let pesoParaDistribuir = pesoTotal;
  let caminhoes = [];

  while (pesoParaDistribuir > 0) {
    let qtdCaminhoes = caminhoes.length;

    if (pesoParaDistribuir >= 10) {
      caminhoes.push(criaCaminhao(2, qtdCaminhoes));
      pesoParaDistribuir -= 10;
    } else if (pesoParaDistribuir >= 4) {
      caminhoes.push(criaCaminhao(1, qtdCaminhoes));
      pesoParaDistribuir -= 4;
    } else {
      caminhoes.push(criaCaminhao(0, qtdCaminhoes));
      pesoParaDistribuir -= 1;
    }
  }

  return caminhoes;
}

// função que conta quantos caminhões de determinado porte serão utilizados
export function contaCaminhao(id, caminhoes) {
  let cont = 0;

  caminhoes.forEach((caminhao) => {
    if (caminhao.caminhaoId == id) cont++;
  });

  return cont;
}
