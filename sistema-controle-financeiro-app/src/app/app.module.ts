import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TabViewModule } from 'primeng/tabview';
import { MessageService, ConfirmationService } from 'primeng/api';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    TabViewModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,

    LancamentosModule,
    PessoasModule,
    CoreModule,

    HttpClientModule
  ],

  providers: [
    LancamentoService,
    PessoaService,

    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
