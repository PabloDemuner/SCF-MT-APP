import { Lancamento } from './../model/lamcamento-impl.model';
import { ILancamento } from './../model/lancamento.model';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { IPessoa } from 'src/app/pessoas/model/pessoa.model';

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

  categorias = [];

  pessoas = [];

  lancamento: ILancamento = new Lancamento();

  constructor(
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregaCategorias()
    this.carregaPessoas()
  }

  carregaCategorias() {
    return this.categoriaService.listar()
    .subscribe(categorias => {
      this.categorias = categorias.map(categoria => {
        return {label: categoria.nome, value: categoria.id};
      });
    }),
    (error => this.errorHandler.handle(error));
  }

  carregaPessoas() {
    return this.pessoaService.listarTodas()
    .subscribe(pessoas => {
      this.pessoas = pessoas.content.map((pessoa: IPessoa) => {
        return {label: pessoa.nome, value: pessoa.id};
      });
    }),
    (error => this.errorHandler.handle(error));
  }
}
