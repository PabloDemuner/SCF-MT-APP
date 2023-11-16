import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  relatoriosLancamentosPorPessoa(dataInicio: Date, dataFim: Date) {
    let params = new HttpParams()
    params = params.set('dataInicio', moment(dataInicio).format('YYYY-MM-DD'));
    params = params.set('dataFim', moment(dataFim).format('YYYY-MM-DD'));
      debugger;
      return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
