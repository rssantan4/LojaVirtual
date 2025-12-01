import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  vendidos: number;
  estoque: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Disco A',
      preco: 99.90,
      imagem: 'assets/img/fotos-produtos/produto1.jpeg',
      vendidos: 150,
      estoque: 10,
      categoria: 'Rock'
    },
    {
      id: 2,
      nome: 'Disco B',
      preco: 89.90,
      imagem: 'assets/img/fotos-produtos/produto2.jpeg',
      vendidos: 200,
      estoque: 8,
      categoria: 'Pop'
    },
    {
      id: 3,
      nome: 'Disco C',
      preco: 120.00,
      imagem: 'assets/img/fotos-produtos/produto3.jpeg',
      vendidos: 180,
      estoque: 5,
      categoria: 'K-Pop'
    },
    {
      id: 4,
      nome: 'Disco D',
      preco: 75.50,
      imagem: 'assets/img/fotos-produtos/produto4.jpeg',
      vendidos: 160,
      estoque: 3,
      categoria: 'Clássico'
    }
  ];

  constructor() {}

  /** Lista todos os produtos */
  getProdutos(): Produto[] {
    return this.produtos;
  }

  /** Retorna apenas os produtos mais vendidos */
  getProdutosMaisVendidos(): Produto[] {
    return [...this.produtos].sort((a, b) => b.vendidos - a.vendidos);
  }

  /** Retorna lista de categorias únicas */
  getCategorias(): string[] {
    return [...new Set(this.produtos.map(p => p.categoria))];
  }

  /** Filtra produtos por categoria */
  filtrarPorCategoria(categoria: string): Produto[] {
    return this.produtos.filter(p => p.categoria === categoria);
  }

  /** Filtro de busca por nome */
  buscarProdutos(termo: string): Produto[] {
    const texto = termo.toLowerCase();
    return this.produtos.filter(p =>
      p.nome.toLowerCase().includes(texto)
    );
  }

  /** Buscar produto específico por ID (se precisar no futuro) */
  getProdutoPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }
}
