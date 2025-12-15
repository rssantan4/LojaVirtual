import { ChangeDetectorRef, Component } from '@angular/core';
import { ProdutoService } from '../services/produto-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarInternoAdm } from "../../../navbar/navbar-interno-adm/navbar-interno-adm";
import { GeneroMusicalService } from '../../genero-musical/services/genero-musical-service';
import { MatSelectModule } from '@angular/material/select';
import { Produto } from '../../../models/produto-model';
import { GeneroMusical } from '../../../models/generoMusical-models';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from '@angular/router';
import { Alerts } from '../../../shared/alerts/alerts';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-editar-produto',
  imports: [MatFormFieldModule, FormsModule, MatButtonModule,
    CommonModule, MatSelectModule, MatInputModule, MatIconModule, NavbarInternoAdm, MatProgressSpinner],
  templateUrl: './editar-produto.html',
  styleUrl: './editar-produto.scss',
})
export class EditarProduto {

  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  buscaProduto: string = '';
  produtoSelecionado: Produto | null = null;
  generosMusicais: GeneroMusical[] = [];
  loadingProdutos = true;
  loadingSalvar = false;
  modal = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private generoService: GeneroMusicalService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 🔹 Carrega produtos do resolver
    this.route.data.subscribe(({ produtos }) => {
      this.produtos = produtos;
      this.produtosFiltrados = [...produtos];
      this.loadingProdutos = false;
      this.cdr.detectChanges(); // força atualização do template
    });

    this.carregarGeneros();
  }

  carregarGeneros(): void {
    this.generoService.getAll().subscribe({
      next: (lista) => {
        this.generosMusicais = lista;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar gêneros', err)
    });
  }

  filtrarProdutos(): void {
    const termo = this.buscaProduto.toLowerCase();
    this.produtosFiltrados = this.produtos.filter(p => p.nome.toLowerCase().includes(termo));
    this.cdr.detectChanges();
  }

  abrirConfirmacao(produto: Produto) {
    this.produtoSelecionado = { ...produto };

    const generoEncontrado = this.generosMusicais.find(
      g => g.id === produto.generoMusical?.id
    );
    if (generoEncontrado) {
      this.produtoSelecionado.generoMusical = generoEncontrado;
    }

    this.modal = true;
    this.cdr.detectChanges();
  }

  EditarProduto(): void {
    if (!this.produtoSelecionado) return;

    if (!this.produtoSelecionado.nome?.trim() ||
    !this.produtoSelecionado.artista?.trim() ||
        !this.produtoSelecionado.generoMusical?.id ||
        this.produtoSelecionado.preco === null ||
        this.produtoSelecionado.estoque === null) {
      this.dialog.open(Alerts, { data: 'Preencha todos os campos obrigatórios antes de salvar.' });
      return;
    }

    this.produtoSelecionado.nome = this.capitalizeFirstLetter(this.produtoSelecionado.nome);
    this.loadingSalvar = true;
    this.cdr.detectChanges(); // força o loading a aparecer imediatamente

    this.produtoService.updateProduto(this.produtoSelecionado).subscribe({
      next: (produtoAtualizado) => {
        const index = this.produtos.findIndex(p => p.id === produtoAtualizado.id);
        if (index > -1) this.produtos[index] = produtoAtualizado;

        this.filtrarProdutos();

        this.modal = false;
        this.produtoSelecionado = null;
        this.loadingSalvar = false;
        this.cdr.detectChanges(); // garante que modal e loading sejam atualizados

        this.dialog.open(Alerts, { data: 'Produto atualizado com sucesso!' });

      },
      error: (err) => {
        this.loadingSalvar = false;
        this.cdr.detectChanges();
        let mensagem = 'Erro ao atualizar produto. Tente novamente.';
        if (err.status === 0) mensagem = 'Servidor fora do ar. Tente mais tarde.';
        this.dialog.open(Alerts, { data: mensagem });
      }
    });
  }

  cancelarEdicao() {
    this.produtoSelecionado = null;
    this.modal = false;
    this.cdr.detectChanges();
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
