import { itens } from "../mocks/itens.js";
import { veiculos } from "../mocks/veiculos.js";
import { escolheTransporte, contaCaminhao } from "./verificaTransporte.js";

// função que calcula o valor do frete entre 2 cidades

export function calculaFrete(saida, destino, produtos, distancia) {
  // declaração das variáveis

  let itensFrase = "";
  let frete = "";
  let pesoTotalKG = 0;
  let totProdutos = 0;
  let valorTotal = 0;

  // contagem dos produtos, junto à contagem do peso, e formulação da frase que contém os itens que vão ser enviados
  produtos.forEach((item) => {
    let produto = itens.find((p) => p.id == item.itemId);
    totProdutos += parseInt(item.qtdItem);
    itensFrase += `${item.qtdItem} ${produto.nome}, `;
    pesoTotalKG += item.pesoTotal;
  });

  // peso total dos produtos em toneladas
  const pesoTotalTon = pesoTotalKG / 1000;

  // criação do objeto que contém os caminhões que vão ser utilizados na entrega
  const caminhoes = escolheTransporte(pesoTotalTon);

  // criação da frase descrevendo os caminhões
  let caminhoesFrase = `${
    contaCaminhao(0, caminhoes)
      ? contaCaminhao(0, caminhoes) + " caminhões de PEQUENO porte, "
      : ""
  }${
    contaCaminhao(1, caminhoes)
      ? contaCaminhao(1, caminhoes) + " caminhões de MÉDIO porte, "
      : ""
  }${
    contaCaminhao(2, caminhoes)
      ? contaCaminhao(2, caminhoes) + " caminhões de GRANDE porte, "
      : ""
  }`;

  // soma do preço por km rodado dos caminhões utilizados
  caminhoes.forEach((caminhao) => {
    let veiculo = veiculos.find((v) => v.id == caminhao.caminhaoId);
    valorTotal += veiculo.preco;
  });

  // cálculo do valor preço total do frete
  valorTotal *= distancia;

  // cálculo do valor unitário médio
  let valorUni = valorTotal / totProdutos;

  // transformação dos valores total e unitário em uma String no formato de moeda Brasileiro
  valorTotal = valorTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  valorUni = valorUni.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // frase que contém o relatório do frete
  frete = `De ${saida.nome} para ${destino.nome}, a distância a ser percorrida é de ${distancia} km. Para o transporte dos produtos ${itensFrase} será necessário utilizar ${caminhoesFrase} de forma a resultar no menor custo de transporte por km rodado. O valor total do transporte dos itens é ${valorTotal}, sendo ${valorUni} é o custo unitário médio.`;

  return frete;
}
