import { ICategoria } from './model/categoria.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listar(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(this.categoriasUrl);
  }
}
