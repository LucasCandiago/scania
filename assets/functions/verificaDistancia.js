import { distancias } from "../mocks/distancias.js";

// função que recebe as cidades de saída e destino por parâmetros, e verifica a distância entre elas conforme os dados recebidos do arquivo csv, retornando a distância
export function verificaDistancia(saida, destino) {
  let distancia;
  let saidaId = saida.id;
  let cidadeDestino = destino.nome;

  let rotasSaida = distancias[saidaId];

  for (let key in rotasSaida) {
    if (key == cidadeDestino) {
      distancia = rotasSaida[key];
    }
  }

  return distancia;
}
