import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';

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
    CoreModule
  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
