import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { TabViewModule } from 'primeng/tabview';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
    { path: 'pessoas', component: PessoaPesquisaComponent },
    { path: 'pessoas/nova', component: PessoaCadastroComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ]

  registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({

  imports: [
    
    RouterModule.forRoot(routes),

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
      }),
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }