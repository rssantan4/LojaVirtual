import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneroMusical } from '../../../models/generoMusical-models';

@Injectable({
  providedIn: 'root',
})
export class GeneroMusicalService {

  private readonly API = 'http://localhost:8080/api/generos';

  constructor(private httpClient: HttpClient) {}

  // 🔹 LISTAR TODOS
  getAll(): Observable<GeneroMusical[]> {
    return this.httpClient.get<GeneroMusical[]>(this.API);
  }

  // 🔹 BUSCAR POR ID
  getById(id: number): Observable<GeneroMusical> {
    return this.httpClient.get<GeneroMusical>(`${this.API}/${id}`);
  }

  // 🔹 CRIAR (só funciona se tiver POST no backend)
  create(genero: GeneroMusical): Observable<GeneroMusical> {
    return this.httpClient.post<GeneroMusical>(this.API, genero);
  }

  // 🔹 ATUALIZAR
  update(genero: GeneroMusical): Observable<GeneroMusical> {
    return this.httpClient.put<GeneroMusical>(
      `${this.API}/${genero.id}`,
      genero
    );
  }

  // 🔹 REMOVER
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`);
  }
}
