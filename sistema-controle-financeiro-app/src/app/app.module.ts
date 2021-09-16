import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';

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

    LancamentosModule,
    PessoasModule,
    CoreModule,

    HttpClientModule
  ],

  providers: [
    LancamentoService,
    PessoaService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
