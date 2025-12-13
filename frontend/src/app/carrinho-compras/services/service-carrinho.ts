import { HttpClient } from '@angular/common/http';
import { GeneroMusical } from './../../models/generoMusical-models';
import { Produto } from './../../models/produto-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Carrinho, ItemCarrinho } from '../../models/carrinho';


@Injectable({
  // providedIn: 'root' garante que o serviço esteja disponível
  // em toda a aplicação (Singleton).
  providedIn: 'root'
})

export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/api/carrinho';

  constructor(private http: HttpClient) { }

  // GET - Buscar carrinho por usuário
  getCarrinho(usuarioId: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.apiUrl}/${usuarioId}`);
  }

  // POST - Adicionar item
  adicionarItem(usuarioId: number, produtoId: number, quantidade: number): Observable<Carrinho> {
    const body = { produtoId, quantidade };
    return this.http.post<Carrinho>(`${this.apiUrl}/${usuarioId}/adicionar`, body);
  }

  // DELETE - Remover item
  removerItem(usuarioId: number, produtoId: number): Observable<Carrinho> {
    return this.http.delete<Carrinho>(`${this.apiUrl}/${usuarioId}/remover/${produtoId}`);
  }

  // AUMENTAR quantidade (+)
aumentar(usuarioId: number, item: ItemCarrinho) {
  return this.adicionarItem(usuarioId, item.produto.id, 1);
}

// DIMINUIR quantidade (–)
diminuir(usuarioId: number, item: ItemCarrinho) {

  // Se já for 1 → remover
  if (item.quantidade === 1) {
    return this.removerItem(usuarioId, item.produto.id);
  }

  // Se for maior que 1 → remover 1 unidade
  // Estratégia: remove 1 e deixa o back recalcular tudo
  return this.removerItem(usuarioId, item.produto.id).pipe(
    switchMap(() => this.adicionarItem(usuarioId, item.produto.id, item.quantidade - 1))
  );
}

// DELETE - Limpar carrinho
limparCarrinho(usuarioId: number): Observable<Carrinho> {
  return this.http.delete<Carrinho>(`${this.apiUrl}/${usuarioId}/limpar`);
}





}
