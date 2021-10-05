import { Lancamento } from '../model/lancamento-impl.model';
import { ILancamento } from './../model/lancamento.model';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { IPessoa } from 'src/app/pessoas/model/pessoa.model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  lancamento: ILancamento = new Lancamento();

  constructor(
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.carregaCategorias()
    this.carregaPessoas()
  }

  carregaCategorias() {
    return this.categoriaService.listar()
      .subscribe(categorias => {
        this.categorias = categorias.map(categoria => {
          return { label: categoria.nome, value: categoria.id };
        });
      }),
      (error => this.errorHandler.handle(error));
  }

  carregaPessoas() {
    return this.pessoaService.listarTodas()
      .subscribe(pessoas => {
        this.pessoas = pessoas.content.map((pessoa: IPessoa) => {
          return { label: pessoa.nome, value: pessoa.id };
        });
      }),
      (error => this.errorHandler.handle(error));
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', detail: 'Lancamento adicionado com sucesso!' });
        lancamentoForm.reset();
        this.lancamento = new Lancamento();
      },
        error => this.errorHandler.handle(error)
      );
  }
}
