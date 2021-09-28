import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  totalRegistros = 0;

  @ViewChild('tabela') tabelaLancamentos;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationMessage: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExlusao(lancamento: any): void {
    this.confirmationMessage.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .subscribe(() => {
        if (this.tabelaLancamentos.first === 0) {
          this.pesquisar();
        } else {
          this.tabelaLancamentos.reset();
        }
        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
      },
        (error) => this.errorHandler.handle(error)
      );
  }
}
