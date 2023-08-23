import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/lancamentos/model/lancamento-impl.model';
import { IPessoa } from '../model/pessoa.model';
import { PessoaService } from '../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: IPessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];

    this.title.setTitle('Nova pessoa');

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
   }

  salvar(pessoaForm: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(pessoaForm);
    } else {
      this.salvarPessoa(pessoaForm);
    }
  }

  salvarPessoa(pessoaForm: NgForm) {
    console.log(this.pessoa);
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(pessoa => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas', pessoa.id]);
      },
        error => this.errorHandler.handle(error)
      );
  }

  atualizarPessoa(pessoaForm: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .subscribe(pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });
        this.atualizarTituloEdicao();
      },
      error => this.errorHandler.handle(error)
      );
  }

  nova(pessoaForm: NgForm) {
    pessoaForm.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  get editando() {
    return Boolean(this.pessoa.id)
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscaPorId(id)
      .subscribe(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      },
      error => this.errorHandler.handle(error)
      );
  }
}
