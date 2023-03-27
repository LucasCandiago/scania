import { cidades } from "../mocks/cidades.js";

// função que busca a cidade no objeto que armazena as cidades disponíveis para o frete
export function verificaCidade(saida) {
    let cidade;
    
    cidades.map((city) => {
        if (city.nome == saida.toUpperCase()) {
            cidade = city;
        }
    })

    return cidade;
}