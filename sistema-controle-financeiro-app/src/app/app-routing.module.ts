import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './core/pagina-nao-autorizada.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'pagina-nao-autorizada', component: PaginaNaoAutorizadaComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    //{ path: '**', redirectTo: 'pagina-nao-encontrada' }
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