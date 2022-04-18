import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

import { IPessoa } from 'src/app/pessoas/model/pessoa.model';
import { Lancamento } from '../model/lancamento-impl.model';
import { ILancamento } from './../model/lancamento.model';

import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregaCategorias();
    this.carregaPessoas();

    const idLancamento = (this.route.snapshot.params['id']);
    if(idLancamento) {
      this.carregaLancamento(idLancamento);
    }
  }

  get labelEdicaoLancamento() {
    return Boolean(this.lancamento.id);
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

  private converteStringsParaDatas(lancamentos: ILancamento[]) {

    for (const lancamento of lancamentos) {

      lancamento.dataVencimento = new Date(lancamento.dataVencimento);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento);
      }
    }
  }

  carregaLancamento(id: number) {
    this.lancamentoService.buscaPorId(id)
    .subscribe(lancamento => {
      this.converteStringsParaDatas([lancamento]);
      this.lancamento = lancamento;
    },
    error => this.errorHandler.handle(error)
    );
  }
}
