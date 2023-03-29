import { NgModule } from '@angular/core';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'lancamentos', 
        component: LancamentosPesquisaComponent
    },
    { path: 'lancamentos/novo',
        component: LancamentosCadastroComponent
    },
    { path: 'lancamentos/:id',
        component: LancamentosCadastroComponent
    },
  ]

@NgModule({
  

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class LancamentosRoutingModule { }
