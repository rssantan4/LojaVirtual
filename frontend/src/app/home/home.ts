import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule,NgFor } from '@angular/common';
import { ProdutoCard } from '../produto-card/produto-card';
import { Produto } from '../models/produto-model';
import { ProdutoService } from '../Area-Adm/produtos/services/produto-service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, ProdutoCard,NgFor],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutoService) { }

  ngOnInit(): void {
  this.produtosService.getMaisVendidos().subscribe(
    (data) => {
      this.produtos = data; // agora sim, data é Produto[]
    },
    (error) => {
      console.error('Erro ao carregar produtos mais vendidos:', error);
    }
  );
}

}
