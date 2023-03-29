import { formatarReal } from "../functions/formatarReal.js";
import { verificaTransporte } from "../functions/verificaTransporte.js"

let result = document.querySelector(".result");

let historico = localStorage.getItem("historico");
historico = JSON.parse(historico);

let trechos = "";
let modalidades = "";

historico.map((transporte) => {
  transporte.custoTrecho.map((trecho) => {
    if (trecho.saida && trecho.destino) {
      trechos += `
                <div class="trechos">
                    <p>Saida: ${trecho.saida}</p>
                    <p>Destino: ${trecho.destino}</p>
                    <p>Custo: ${formatarReal(trecho.custo)}</p>
                </div>
            `;
    }
  });

  transporte.custoModalidade.map((modalidade) => {
    modalidades += `
        <p><strong>${verificaTransporte(modalidade.caminhaoId)}</strong>: ${formatarReal(modalidade.custo)}</p>
    `;
  });

  result.innerHTML += `
    <div class=transporte>
        <h1><strong>Transporte</strong> ${transporte.id + 1}</h1>
        <p><strong>Custo total</strong>: ${formatarReal(transporte.custoTotal)}</p>
        <h3>Custo por trecho:</h3>
        ${trechos}
        <p><strong>Custo médio por km</strong>: ${transporte.custoKm}</p>
        <p><strong>Número de veículos</strong>: ${transporte.numeroVeiculos}</p>
        <h3>Custo total de cada modalidade:</h3>
        ${modalidades}
        <p><strong>Total de itens</strong>: ${transporte.totalItens}</p>
    </div>
    `;
});
