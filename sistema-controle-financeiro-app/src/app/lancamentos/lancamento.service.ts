import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ILancamento } from './model/lancamento.model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoApartir', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos: lancamentos,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.lancamentosUrl}/${id}`);
  }

  adicionar(lancamento: ILancamento): Observable<ILancamento> {
    return this.http.post<ILancamento>(this.lancamentosUrl, lancamento);
  }

  atualizar(lancamento: ILancamento): Observable<ILancamento> {
    return this.http.put<ILancamento>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento);
  }

  buscaPorId(id: number): Observable<ILancamento> {
    return this.http.get<ILancamento>(`${this.lancamentosUrl}/${id}`);
  }

  uploadAnexo() {
    return `${this.lancamentosUrl}/anexo`;
  }
}
