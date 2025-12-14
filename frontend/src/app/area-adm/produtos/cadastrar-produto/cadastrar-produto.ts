import { Component, OnInit} from '@angular/core';
import { AsyncPipe, NgFor, NgIf  } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GeneroMusicalService } from '../../genero-musical/services/genero-musical-service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavbarInternoAdm } from "../../../navbar/navbar-interno-adm/navbar-interno-adm";
import { ProdutoService } from '../services/produto-service';
import { GeneroMusical } from '../../../models/generoMusical-models';
import { Produto } from '../../../models/produto-model';
import { Alerts } from '../../../shared/alerts/alerts';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, AsyncPipe, NgFor,  NgIf, FormsModule, NavbarInternoAdm],
  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.scss',
})
export class CadastrarProduto implements OnInit{

 generos$!: Observable<GeneroMusical[]>;
  produto: Produto = {
    id: 0,
    nome: '',
    preco: null as any,
    descricao: '',
    estoque: null as any,
    artista:'',
    generoMusical: { id: 0, nome: '' },
    imagemUrl: '',
    ativo: true,
  };

  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;

  constructor(private generoService: GeneroMusicalService,
              private produtoService: ProdutoService,
              private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.generos$ = this.generoService.getAll();
  }

onSalvarProduto() {

  // 🔴 Validação dos campos obrigatórios
  if (
    !this.produto.nome?.trim() ||
    !this.produto.artista?.trim() ||
    !this.produto.preco || this.produto.preco <= 0 ||
    this.produto.estoque === null || this.produto.estoque < 0 ||
    !this.produto.generoMusical?.id ||
    !this.imagemSelecionada
  ) {
    this.dialog.open(Alerts, {
      data: 'Preencha todos os campos obrigatórios corretamente.'
    });
    return;
  }

  // 🔹 Formata nome
  this.produto.nome = this.capitalizeFirstLetter(this.produto.nome);

  // 🔹 Salva produto
  this.produtoService.addProduto(this.produto).subscribe({
  next: () => {

    const dialogRef = this.dialog.open(Alerts, {
      data: 'Produto salvo com sucesso!'
    });

    dialogRef.afterClosed().subscribe(() => {

      // 🔄 Resetar formulário APÓS clicar em OK
      this.produto = {
        id: 0,
        nome: '',
        preco: null as any,
        descricao: '',
        estoque: null as any,
        artista: '',
        generoMusical: { id: 0, nome: '' },
        imagemUrl: '',
        ativo: true
      };

      this.imagemPreview = null;
      this.imagemSelecionada = null;
    });
  },

  error: (err) => {
    let mensagem = 'Erro ao salvar produto. Tente novamente.';

    if (err.status === 0) {
      mensagem = 'Servidor fora do ar. Tente mais tarde.';
    }

    this.dialog.open(Alerts, { data: mensagem });
  }
});

}


  onSelecionarGenero(genero: GeneroMusical) {
    this.produto.generoMusical = genero;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
      // Para enviar ao backend apenas o caminho, você pode definir:
      this.produto.imagemUrl = `assets/img/Novos-produtos/${this.imagemSelecionada.name}`;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagemSelecionada);
    }
  }



  // Função para inicial maiúscula
capitalizeFirstLetter(value: string): string {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

}
