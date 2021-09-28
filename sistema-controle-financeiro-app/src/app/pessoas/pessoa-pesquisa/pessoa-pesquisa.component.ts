import { IPessoaFiltro } from './../model/pessoa-filtro.model';
import { IPessoa } from './../model/pessoa.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  filtro: IPessoaFiltro = {
    pagina: 0,
    itensPorPagina: 5
  };
  pessoas: IPessoa[] = [];
  totalRegistros = 0;

  @ViewChild('tabela') tabelaPesquisaPessoa;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationMessage: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() { }

  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
      .subscribe(dados => {
          this.pessoas = dados.content
          this.totalRegistros = dados.totalElements         
        },
        erro => this.errorHandler.handle(erro)
      );
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExlusao(pessoa: IPessoa) {
    this.confirmationMessage.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: IPessoa) {
    this.pessoaService.excluir(pessoa.id)
      .subscribe(() => {
        if (this.tabelaPesquisaPessoa.first === 0) {
          this.pesquisar();
        } else {
          this.tabelaPesquisaPessoa.reset();
        }
        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
      },
        (error) => this.errorHandler.handle(error)
      );
  }
}
