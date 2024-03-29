import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/lancamentos/model/lancamento-impl.model';
import { IPessoa } from '../model/pessoa.model';
import { EnderecoViaCep } from '../model/endereco-viacep.model';
import { PessoaService } from '../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  form!: FormGroup;
  title: string;

  pessoa: IPessoa = new Pessoa();

  cepEndereco: EnderecoViaCep;

  exibirFormNovoContato: boolean;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private fomrBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.configForm();

    const idPessoa = this.route.snapshot.params['id'];
    this.title = 'Cadastro de pessoa';

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  configForm() {
    this.form = this.fomrBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      endereco: this.fomrBuilder.group({
        logradouro: [null, [Validators.required, Validators.minLength(3)]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, [Validators.required, Validators.minLength(3)]],
        cep: [null, [Validators.required, Validators.minLength(8)]],
        cidade: [null, [Validators.required, Validators.minLength(3)]],
        estado: [null, [Validators.required, Validators.minLength(3)]],
      }),
      ativo: [true],
    });
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscaPorId(id)
      .subscribe(pessoa => {
        this.form.patchValue(pessoa);
        this.pessoa = pessoa;

        this.atualizarTituloEdicao();
      },
        error => this.errorHandler.handle(error)
      );
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.salvarPessoa();
    }
  }

  salvarPessoa() {
    const dadosForm = {
      ...this.form.value,
      ativo: true,
      contatos: this.pessoa.contatos
    }
    this.pessoa = dadosForm;

    this.pessoaService.adicionar(this.pessoa)
      .subscribe(pessoa => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas', pessoa.id]);
      },
        error => this.errorHandler.handle(error)
      );
  }

  atualizarPessoa() {
    const dadosForm = {
      ...this.form.value,
      contatos: this.pessoa.contatos
    }
    this.pessoa = dadosForm;
    this.pessoaService.atualizar(this.pessoa)
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
    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    let nomePessoa = this.pessoa.nome;
    this.title = "Edição do(a): " + nomePessoa;
  }

  get editando() {
    return Boolean(this.form.get('id').value)
  }

  pesquisarCep() {
    this.pessoaService.pesquisarCep(this.form.get('endereco.cep').value)
      .subscribe(resultado => {
        console.log(resultado);
        this.cepEndereco = resultado;
        this.form.get('endereco.cep').setValue(resultado.cep);
        this.form.get('endereco.complemento').setValue(resultado.complemento);
        this.form.get('endereco.bairro').setValue(resultado.bairro);
        this.form.get('endereco.cidade').setValue(resultado.localidade);
        this.form.get('endereco.estado').setValue(resultado.uf);
        this.form.get('endereco.logradouro').setValue(resultado.logradouro);
      },
        error => this.errorHandler.handle(error)
      );
  }

}
