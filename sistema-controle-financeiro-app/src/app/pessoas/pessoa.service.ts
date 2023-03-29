import { IApiResponse } from './../core/model/interfaces-gerais.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPessoaFiltro } from './model/pessoa-filtro.model';
import { IPessoa } from './model/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pesquisaPessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: IPessoaFiltro): Observable<IApiResponse<IPessoa>> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2ODAwNjM3NDUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImFkNjhjODEyLWRiYzUtNGMyOC1hMWQ1LWI2ZTIwN2NmOGFlNyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.WtFq-dJiYzU2CM4SSQ7gNb-akG83ksAAVbgdjcOSQlQ');

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<IApiResponse<IPessoa>>(`${this.pesquisaPessoaUrl}`, { headers, params });

  }


  listarTodas(): Observable<IApiResponse<IPessoa>> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2ODAwNjM3NDUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImFkNjhjODEyLWRiYzUtNGMyOC1hMWQ1LWI2ZTIwN2NmOGFlNyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.WtFq-dJiYzU2CM4SSQ7gNb-akG83ksAAVbgdjcOSQlQ');

    return this.http.get<IApiResponse<IPessoa>>(this.pesquisaPessoaUrl, { headers });
  }

  excluir(id: number): Observable<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2ODAwNjM3NDUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImFkNjhjODEyLWRiYzUtNGMyOC1hMWQ1LWI2ZTIwN2NmOGFlNyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.WtFq-dJiYzU2CM4SSQ7gNb-akG83ksAAVbgdjcOSQlQ');

    return this.http.delete<void>(`${this.pesquisaPessoaUrl}/${id}`, { headers });
  }

  atualizarPropriedadeAtiva(id: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2ODAwNjM3NDUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImFkNjhjODEyLWRiYzUtNGMyOC1hMWQ1LWI2ZTIwN2NmOGFlNyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.WtFq-dJiYzU2CM4SSQ7gNb-akG83ksAAVbgdjcOSQlQ')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pesquisaPessoaUrl}/${id}/ativo`, ativo, { headers });
  }

  adicionar(pessoa: IPessoa): Observable<IPessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2ODAwNjM3NDUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImFkNjhjODEyLWRiYzUtNGMyOC1hMWQ1LWI2ZTIwN2NmOGFlNyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.WtFq-dJiYzU2CM4SSQ7gNb-akG83ksAAVbgdjcOSQlQ')
      .append('Content-Type', 'application/json');

    return this.http.post<IPessoa>(this.pesquisaPessoaUrl, pessoa, { headers });
  }
}
