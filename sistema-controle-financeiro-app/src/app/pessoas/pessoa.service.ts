import { IApiResponse } from './../core/model/interfaces-gerais.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPessoaFiltro } from './model/pessoa-filtro.model';
import { IPessoa } from './model/pessoa.model';
import { EnderecoViaCep } from './model/endereco-viacep.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pesquisaPessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: IPessoaFiltro): Observable<IApiResponse<IPessoa>> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<IApiResponse<IPessoa>>(`${this.pesquisaPessoaUrl}`, { params });
  }

  listarTodas(): Observable<IApiResponse<IPessoa>> {
    return this.http.get<IApiResponse<IPessoa>>(this.pesquisaPessoaUrl);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.pesquisaPessoaUrl}/${id}`);
  }

  atualizarPropriedadeAtiva(id: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pesquisaPessoaUrl}/${id}/ativo`, ativo, { headers });
  }

  adicionar(pessoa: IPessoa): Observable<IPessoa> {
    return this.http.post<IPessoa>(this.pesquisaPessoaUrl, pessoa);
  }

  atualizar(pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.pesquisaPessoaUrl}/${pessoa.id}`, pessoa);
  }

  buscaPorId(id: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.pesquisaPessoaUrl}/${id}`);
  }

  pesquisarCep(filtro: string): Observable<EnderecoViaCep> {
    return this.http.get<EnderecoViaCep>(`${this.pesquisaPessoaUrl}/endereco/${filtro}`);
  }

}
