import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContato } from 'src/app/pessoas/model/contato.model';

@Component({
  selector: 'app-form-cadastro-contatos',
  templateUrl: './form-cadastro-contatos.component.html',
  styleUrls: ['./form-cadastro-contatos.component.css']
})
export class FormCadastroContatosComponent implements OnInit {

  formContatos!: FormGroup;
  indexContato: number;

  title: string;

  @Input()
  listaContato: IContato[] = [];

  exibirFormNovoContato: boolean;

  constructor(
    private fomrBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.configForm();
    this.title = 'Novo Contato: ';
  }

  configForm() {
    this.formContatos = this.fomrBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(10)]],
      telefone: [null, [Validators.required]]
    });
  }

  criarNovoContato() {
    this.exibirFormNovoContato = true;
    this.indexContato = this.listaContato.length;
  }

  adicionarContato() {
    const dadosFormContato = {
      ...this.formContatos.value
    }
    this.listaContato.splice(this.indexContato, 1);
    this.listaContato.push(dadosFormContato);

    this.indexContato = -1;
    this.formContatos.reset();
    this.exibirFormNovoContato = false;
  }

  editarContato(contato: IContato, index: number) {
    this.atualizarTituloEdicao();

    this.exibirFormNovoContato = true;
    this.formContatos.patchValue(contato);
    this.indexContato = index;
  }

  excluirContato(index: number) {
    this.listaContato.splice(index, 1);
  }

  atualizarTituloEdicao() {
    this.title = "Editar Contato: ";
  }

}
