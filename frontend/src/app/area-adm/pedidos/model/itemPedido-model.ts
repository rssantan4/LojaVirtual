import { Produto } from "../../produtos/model/produto-model";

export interface ItemPedido {
  produto: Produto;
  quantidadeComprada: number;
}
