import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { GeneroMusical } from '../../../models/generoMusical-models';

@Injectable({
  providedIn: 'root',
})
export class GeneroMusicalService {

private generos: GeneroMusical[] = [
  { id: 1, nome: 'Pop' },
  { id: 2, nome: 'MPB' },
  { id: 3, nome: 'Musical' },
  { id: 4, nome: 'Rock' },
  { id: 5, nome: 'K-pop' },
  { id: 6, nome: 'Worship' },
  { id: 7, nome: 'Sertanejo' },
  { id: 8, nome: 'Olodum' },
  { id: 9, nome: 'Samba' },
  { id: 10, nome: 'Reggae' }
];


  private readonly API = 'http://localhost:8080/api/generos';

  // 🔹 Subject para simular atualizações (como se fosse API)
  private generosSubject = new BehaviorSubject<GeneroMusical[]>([...this.generos]);

  constructor(private httpClient: HttpClient) {}

  // LISTAR TODOS
  getAll(): Observable<GeneroMusical[]> {
    return this.generosSubject.asObservable().pipe(first());
  }

  // BUSCAR POR ID
  getById(id: number): Observable<GeneroMusical | undefined> {
    return this.generosSubject.pipe(
      map(lista => lista.find(g => g.id === id)),
      first()
    );
  }

  // CRIAR
  create(genero: GeneroMusical): Observable<GeneroMusical> {
    const novoId = Math.max(...this.generos.map(g => g.id)) + 1;

    const novoGenero: GeneroMusical = {
      id: novoId,
      nome: genero.nome
    };

    this.generos.push(novoGenero);
    this.generosSubject.next([...this.generos]);

    return new BehaviorSubject(novoGenero).pipe(first());
  }

  // ATUALIZAR
  update(genero: GeneroMusical): Observable<GeneroMusical> {
    const index = this.generos.findIndex(g => g.id === genero.id);
    if (index !== -1) {
      this.generos[index] = genero;
      this.generosSubject.next([...this.generos]);
    }

    return new BehaviorSubject(genero).pipe(first());
  }

  // REMOVER
  delete(id: number): Observable<void> {
    this.generos = this.generos.filter(g => g.id !== id);
    this.generosSubject.next([...this.generos]);

    return new BehaviorSubject<void>(undefined).pipe(first());
  }

}
