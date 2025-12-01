import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  vendidos: number;
  estoque: number; 
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private produtos: Produto[] = [
    { id: 1, nome: 'Disco A', preco: 99.90, imagem: 'assets/img/fotos-produtos/produto1.jpeg', vendidos: 150, estoque: 10 },
    { id: 2, nome: 'Disco B', preco: 89.90, imagem: 'assets/img/fotos-produtos/produto2.jpeg', vendidos: 200, estoque: 8 },
    { id: 3, nome: 'Disco C', preco: 120.00, imagem: 'assets/img/fotos-produtos/produto3.jpeg', vendidos: 180, estoque: 5 },
    { id: 4, nome: 'Disco D', preco: 75.50, imagem: 'assets/img/fotos-produtos/produto4.jpeg', vendidos: 160, estoque: 3 }
  ];

  constructor() { }

  getProdutosMaisVendidos(): Produto[] {
    return this.produtos.sort((a, b) => b.vendidos - a.vendidos);
  }
}
