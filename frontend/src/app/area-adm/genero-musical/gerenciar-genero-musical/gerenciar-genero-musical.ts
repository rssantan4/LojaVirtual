import { Component, OnInit  } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GeneroMusicalService } from '../services/genero-musical-service';

import { ErrorDialog } from '../../../shared/error-dialog/error-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, first } from 'rxjs/operators';
import { ConfirmationDialog } from '../../../shared/confirmation-dialog/confirmation-dialog';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NavbarInternoAdm } from "../../../navbar/navbar-interno-adm/navbar-interno-adm";
import { GeneroMusical } from '../../../models/generoMusical-models';
import { Alerts } from '../../../shared/alerts/alerts';
@Component({
  selector: 'app-gerenciar-genero-musical',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatListModule,
    MatTableModule, AsyncPipe,
    NgFor,
    NgIf, NavbarInternoAdm],
    standalone: true,
  templateUrl: './gerenciar-genero-musical.html',
  styleUrl: './gerenciar-genero-musical.scss',
})

export class GerenciarGeneroMusical implements OnInit {
  generos$!: Observable<GeneroMusical[]>;
  generoForm: GeneroMusical = { id: 0, nome: '' };

  constructor(
    private generoService: GeneroMusicalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  //  Atualiza a lista do observable
  refresh() {
    this.generos$ = this.generoService.getAll().pipe(first());
  }

 // Criar ou atualizar
onSave() {
  const nome = this.generoForm.nome?.trim();
  if (!nome) return;

  if (this.generoForm.id) {
    this.generoService.update({ ...this.generoForm, nome }).subscribe(() => {
      this.dialog.open(Alerts, {
        data: 'Gênero atualizado com sucesso!'
      });
      this.refresh();
    });
  } else {
    this.generoService.create({ id: 0, nome }).subscribe(() => {
      this.dialog.open(Alerts, {
        data: 'Gênero criado com sucesso!'
      });
      this.refresh();
    });
  }

  this.onCancel();
}


  // Editar
  onEdit(genero: GeneroMusical) {
    this.generoForm = { ...genero };
  }

  //  Remover
onRemove(genero: GeneroMusical) {
  const dialogRef = this.dialog.open(ConfirmationDialog, {
    data: `Deseja mesmo excluir?`
  });

  dialogRef.afterClosed().subscribe((confirm: boolean) => {
    if (confirm) {
      this.generoService.delete(genero.id).subscribe({
        next: () => {
          this.dialog.open(Alerts, {
            data: 'Gênero removido com sucesso!'
          });
          this.refresh();
        },
        error: (err) => {
          let mensagem = 'Erro ao remover o gênero.';

          // regra de negócio: gênero com produtos vinculados
          if (err.status === 400 || err.status === 409) {
            mensagem = 'Este gênero possui produtos cadastrados e não pode ser excluído.';
          }

          this.dialog.open(Alerts, {
            data: mensagem
          });
        }
      });
    }
  });
}


  // 🔹 Cancelar edição/novo
  onCancel() {
    this.generoForm = { id: 0, nome: '' };
  }

  // 🔹 Função auxiliar: primeira letra maiúscula
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }



}
