import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { Pedido } from '../model/pedido-model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
/* Com o banco
   private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  buscarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  atualizarPedido(pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pedido.id}`, pedido);
  } */
 private pedidos: Pedido[] = [
    {
      id: '1',
      clienteId: '101',
      total: 199.90,
      data: new Date(),
      status: 'pendente'
    },
    {
      id: '2',
      clienteId: '102',
      total: 349.50,
      data: new Date(),
      status: 'enviado'
    }
  ];

  constructor() { }

  getPedidos(): Observable<Pedido[]> {
    return of(this.pedidos);
  }

  atualizarStatus(id: string, novoStatus: Pedido['status']): Observable<Pedido> {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.status = novoStatus;
    }
    return of(pedido!);
  }




}
