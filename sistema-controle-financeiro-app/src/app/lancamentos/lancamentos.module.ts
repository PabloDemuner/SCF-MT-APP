import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

import { SharedModule } from './../shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { NgxCurrencyModule } from 'ngx-currency';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent,
    LancamentosGridComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    LancamentosRoutingModule,

    ReactiveFormsModule,

    SharedModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    NgxCurrencyModule,
    InputMaskModule,
    FileUploadModule,
    ProgressSpinnerModule
  ],

  exports: [
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent
  ]
})
export class LancamentosModule { }
