import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from  'primeng/sidebar';

import { ErrorHandlerService } from './error-handler.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RelatoriosService } from '../relatorios/relatorios.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { AuthService } from '../seguranca/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './pagina-nao-autorizada.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    PaginaNaoAutorizadaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    SidebarModule,
    ConfirmDialogModule,
  ],

  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    AuthService,
    PessoaService,
    DashboardService,
    RelatoriosService,
    LancamentoService,
    

    MessageService,
    ErrorHandlerService,
    ConfirmationService,
  ]
})
export class CoreModule { }
