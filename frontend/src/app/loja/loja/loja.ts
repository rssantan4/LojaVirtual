import { Component, OnInit } from '@angular/core';
import { ProdutoCard } from '../../produto-card/produto-card';
import { Produto, ProdutosService } from '../../home/services/produtos';

@Component({
  selector: 'app-loja',
  imports: [ProdutoCard],
  templateUrl: './loja.html',
  styleUrl: './loja.scss',
})
export class Loja {

}
