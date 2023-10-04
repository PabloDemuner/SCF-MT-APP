import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  form!: FormGroup;
  //pessoa: IPessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private fomrBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.configForm();

    const idPessoa = this.route.snapshot.params['id'];
    this.title.setTitle('Nova pessoa');

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
   }

   configForm() {
      this.form = this.fomrBuilder.group({
        id: [],
        nome:[null, [Validators.required, Validators.minLength(3)]],
        endereco: this.fomrBuilder.group({
          logradouro: [null, [Validators.required, Validators.minLength(3)]],
          numero: [null, Validators.required],
          complemento: [null],
          bairro: [null, [Validators.required, Validators.minLength(3)]],
          cep: [null, [Validators.required, Validators.minLength(8)]],
          cidade: [null, [Validators.required, Validators.minLength(3)]],
          estado: [null, [Validators.required, Validators.minLength(3)]],
        }),
        ativo:[true],
      });
   }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.salvarPessoa();
    }
  }

  salvarPessoa() {
    console.log(this.form.value);
    this.pessoaService.adicionar(this.form.value)
      .subscribe(pessoa => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas', pessoa.id]);
      },
        error => this.errorHandler.handle(error)
      );
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.form.value)
      .subscribe(pessoa => {
        this.form.patchValue(pessoa);
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });
        this.atualizarTituloEdicao();
      },
      error => this.errorHandler.handle(error)
      );
  }

  nova() {
    this.form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.form.get('nome').value}`);
  }

  get editando() {
    return Boolean(this.form.get('id').value)
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscaPorId(id)
      .subscribe(pessoa => {
        this.form.patchValue(pessoa);
        this.atualizarTituloEdicao();
      },
      error => this.errorHandler.handle(error)
      );
  }
}
