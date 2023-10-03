import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

import { IPessoa } from 'src/app/pessoas/model/pessoa.model';
import { Lancamento } from '../model/lancamento-impl.model';
import { ILancamento } from './../model/lancamento.model';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
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

  //lancamento: ILancamento = new Lancamento();

  form!: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private fomrBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.configForm();

    this.carregaCategorias();
    this.carregaPessoas();

    const idLancamento = (this.route.snapshot.params['id']);
    if (idLancamento) {
      this.carregaLancamento(idLancamento);
    }
  }

  configForm() {
    this.form = this.fomrBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.fomrBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      categoria: this.fomrBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: [null]
    });
  }

  get labelEdicaoLancamento() {
    return Boolean(this.form.get('id').value);
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

  salvar() {
    if (this.labelEdicaoLancamento) {
      this.atualizarLancamento();
    }
    this.adicionarLancamento();
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.form.value)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', detail: 'Lancamento adicionado com sucesso!' });
        this.router.navigate(['/lancamentos']);
      },
        error => this.errorHandler.handle(error)
      );
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.form.value)
      .subscribe(lancamento => {
        this.form.patchValue(lancamento);
        //this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lancamento adicionado com sucesso!' });
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
        this.form.patchValue(lancamento);
        //this.lancamento = lancamento;
      },
        error => this.errorHandler.handle(error)
      );
  }

  onNovoLancamento() {
    this.form.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }
}
