import { RelatoriosService } from './../relatorios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;

  constructor(
    private relatorioService: RelatoriosService,
  ) { }

  ngOnInit(): void {
  }

  gerarRelatorio() {
    this.relatorioService.relatoriosLancamentosPorPessoa(this.dataInicio, this.dataFim)
      .then(dadosRelatorio => {
        const url = window.URL.createObjectURL(dadosRelatorio);

        window.open(url);
      })
  }

}
