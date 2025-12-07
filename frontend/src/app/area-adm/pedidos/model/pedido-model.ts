export interface Pedido {
  id: string;
  clienteId: string;
  total: number;
  data: Date;
  status: 'pendente' | 'processando' | 'enviado' | 'cancelado';
}
