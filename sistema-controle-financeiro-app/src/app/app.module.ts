import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { TabViewModule } from 'primeng/tabview';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { SegurancaModule } from './seguranca/seguranca.module';

registerLocaleData(localePt, 'pt-BR');

/*export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}*/

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    TabViewModule,
    FormsModule,

    LancamentosModule,
    PessoasModule,
    CoreModule,
    SegurancaModule,
    DashboardModule,

    HttpClientModule,
    AppRoutingModule,

    /*TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
      }),*/
  ],

  providers: [
    //TranslateService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
