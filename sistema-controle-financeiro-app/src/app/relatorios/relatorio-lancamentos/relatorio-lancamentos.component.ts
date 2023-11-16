import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;

  constructor() { }

  ngOnInit(): void {
  }

  gerarRelatorio() {
    console.log(this.dataInicio);
    console.log(this.dataFim);
  }

}
