import { Produto } from './../home/services/produtos';
import { Component,EventEmitter,Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-produto-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './produto-card.html',
  styleUrl: './produto-card.scss',
})
export class ProdutoCard {
  @Input() produto!: Produto ;
    adicionarCarrinho(produto: Produto) {
      console.log("Cliquei no botão!");
    }
}
