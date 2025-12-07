import { ItemPedido } from "./itemPedido-model";

export interface Pedido {
  id: string;
  clienteId: string;
  itens: ItemPedido[];  // 👈 permite mostrar os produtos!
  total: number;
  data: Date;
  status: 'pendente' | 'processando' | 'enviado' | 'cancelado';
}
