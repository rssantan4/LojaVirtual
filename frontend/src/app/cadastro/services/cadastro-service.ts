import { Injectable } from '@angular/core';

import {catchError, delay, first, tap, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly API = 'http://localhost:8080/api/cadastro';

  constructor(private http: HttpClient) {}

  cadastrar(dados: any): Observable<any> {
  return this.http.post<any>(this.API, dados).pipe(first());
} 

}
