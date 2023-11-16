import { DecimalPipe } from '@angular/common';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.buscaEstatisticasPorCategoria();
    this.buscaEstatisticasPorDia();
  }

  buscaEstatisticasPorCategoria() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [{
            data: dados.map(dado => dado.total),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9900', '#109618',
              '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
          }]
        };
      });
  }

  buscaEstatisticasPorDia() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.montaDiasMesAtual();

        const totaisReceitas = this.totaisPorDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'RECEITAS',
              data: totaisReceitas,
              borderColor: '#3366CC'
            },
            {
              label: 'DESPESAS',
              data: totaisDespesas,
              borderColor: '#DC3912'
            }
          ]
        }
      });
  }

  private totaisPorDiaMes(dados, diasDoMes) {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  //TODO migrar para uma classe util
  private montaDiasMesAtual() {
    const mesReferencia = new Date();
    //Pega o próximo mês como referência
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    //O setDate(0) pega o ultimo dia do mês atual,
    //porque o indice 0 do próximo mês é sempre o ultimo dia do mês atual.
    mesReferencia.setDate(0);

    const quantidadeDias = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidadeDias; i++) {
      dias.push(i);
    }
    return dias;
  }

  //TODO migrar para uma classe util
  //Formata as casas decimais dos graficos chart.js@2.9.4
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

}
