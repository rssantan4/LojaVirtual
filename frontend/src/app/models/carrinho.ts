import { Produto } from './produto-model';

export interface Carrinho {
  id: number;
  itens: ItemCarrinho[];
  valorTotal: number; 
}

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

