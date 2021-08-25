import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    {label: 'Alimentação', value: '1'},
    {label: 'Transporte', value: '2'}
  ];

  pessoas = [
    {label: 'João de Souza', value: '3'},
    {label: 'Maria da Silva', value: '4'},
    {label: 'Pablo Demuner', value: '5'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
