import { veiculos } from "../mocks/veiculos.js";
import { verificaPrecoTransporte } from "./verificaTransporte.js";
import { escolheTransporte } from "./verificaTransporte.js";

export function calculaTransporte(saida, destino, produtos, distancia) {
  // declaração das variáveis
  let frete = [];
  let pesoTotalKG = 0;
  let totProdutos = 0;
  let valorTotal = 0;

  // contagem dos produtos, junto à contagem do peso, e formulação da frase que contém os itens que vão ser enviados
  produtos.forEach((item) => {
    totProdutos += item.qtdItem;
    pesoTotalKG += item.pesoTotal;
  });

  // peso total dos produtos em toneladas
  const pesoTotalTon = pesoTotalKG / 1000;

  // criação do objeto que contém os caminhões que vão ser utilizados na entrega
  const caminhoes = escolheTransporte(pesoTotalTon);

  // soma do preço por km rodado dos caminhões utilizados
  caminhoes.forEach((caminhao) => {
    let veiculo = veiculos.find((v) => v.id == caminhao.caminhaoId);
    valorTotal += veiculo.preco;
  });

  // cálculo do valor preço total do frete
  valorTotal *= distancia;

  frete = {
    saida: saida.nome,
    destino: destino.nome,
    distancia: distancia,
    produtos: produtos,
    totalItens: totProdutos,
    caminhoes: caminhoes,
    numeroVeiculos: caminhoes.length,
    custoTotal: valorTotal,
  };

  return frete;
}

export function salvaTransporte(trecho1, trecho2 = null) {
  let custoTotal;
  let custoTrecho1;
  let custoTrecho2;
  let custoKm;
  let numeroVeiculos;
  let distanciaTotal;
  let totalItens = 0;

  let custoModalidade = [
    {
      id: 0,
      caminhaoId: 0,
      totalCaminhoest1: 0,
      totalCaminhoest2: 0,
      custo: 0,
    },
    {
      id: 1,
      caminhaoId: 1,
      totalCaminhoest1: 0,
      totalCaminhoest2: 0,
      custo: 0,
    },
    {
      id: 2,
      caminhaoId: 2,
      totalCaminhoest1: 0,
      totalCaminhoest2: 0,
      custo: 0,
    },
  ];

  if (trecho2) {
    distanciaTotal = trecho1.distancia + trecho2.distancia;

    custoTotal = trecho1.custoTotal + trecho2.custoTotal;

    custoKm = custoTotal / (trecho1.distancia + trecho2.distancia);

    trecho2.caminhoes.map((caminhao) => {
      custoModalidade[caminhao.caminhaoId].totalCaminhoest2 += 1;
    });

    custoTrecho2 = trecho2.custoTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    distanciaTotal = trecho1.distancia;

    custoTotal = trecho1.custoTotal;

    custoKm = custoTotal / trecho1.distancia;

    // transformação dos valores total e unitário em uma String no formato de moeda Brasileiro
    custoTotal = custoTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    custoTrecho1 = trecho1.custoTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  trecho1.produtos.map((produto) => {
    totalItens += parseInt(produto.qtdItem);
  });

  trecho1.caminhoes.map((caminhao) => {
    custoModalidade[caminhao.caminhaoId].totalCaminhoest1 += 1;
  });

  custoModalidade.map((caminhao) => {
    if (caminhao.totalCaminhoest1 == caminhao.totalCaminhoest2) {
      caminhao.custo = verificaPrecoTransporte(
        caminhao.caminhaoId,
        distanciaTotal,
        caminhao.totalCaminhoest1
      );
    } else {
      let custot1 = verificaPrecoTransporte(
        caminhao.caminhaoId,
        trecho1.distancia,
        caminhao.totalCaminhoest1
      );

      if (trecho2) {
        let custot2 = verificaPrecoTransporte(
          caminhao.caminhaoId,
          trecho2.distancia,
          caminhao.totalCaminhoest2
        );
        caminhao.custo += custot1 + custot2;
      } else {
        caminhao.custo += parseFloat(
          custot1.replace(/\D/g, "").replace(",", ".")
        );
      }
    }
  });

  numeroVeiculos = trecho1.numeroVeiculos;

  custoKm = custoKm.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let history = localStorage.getItem("historico");
  history = JSON.parse(history);

  let transporte = {
    id: history ? history.length : 0,
    custoTotal: custoTotal,
    custoTrecho: [
      {
        id: 0,
        saida: trecho1.saida,
        destino: trecho1.destino,
        custo: trecho1.custoTotal,
      },
      trecho2
        ? {
            id: 1,
            saida: trecho2.saida,
            destino: trecho2.destino,
            custo: trecho2.custoTotal,
          }
        : "",
    ],
    custoKm: custoKm,
    custoModalidade: custoModalidade,
    numeroVeiculos: numeroVeiculos,
    totalItens: totalItens,
  };

  if (!history) history = [];

  history.push(transporte);

  localStorage.setItem("historico", JSON.stringify(history));
}
