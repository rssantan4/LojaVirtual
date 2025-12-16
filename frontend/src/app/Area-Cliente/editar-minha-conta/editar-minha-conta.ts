import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidarService } from '../../login/services/validar-service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../Services/cliente/cliente-service';
import { MatIcon } from "@angular/material/icon";
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Alerts } from '../../shared/alerts/alerts';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-minha-conta',
  imports: [ReactiveFormsModule, MatIcon,CommonModule],
  templateUrl: './editar-minha-conta.html',
  styleUrl: './editar-minha-conta.scss',
})
export class EditarMinhaConta implements OnInit{
  contaForm: FormGroup;

  hideSenha: boolean = true;

  constructor(
    private usuarioService: ClienteService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.contaForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
     // email: new FormControl('', [Validators.required, Validators.email]),
      //senha: new FormControl('', [Validators.minLength(8)]),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]),
      estado: new FormControl('', [Validators.required]),
      endereco:new FormControl('', [Validators.required]),



    });
  }

  ngOnInit() {
    const usuario = this.usuarioService.getUsuarioLogado();
    if(usuario){
      this.contaForm.patchValue({
        nome: usuario.nome,
        //email: usuario.email,
        cep: usuario.cep,
        estado: usuario.estado,

        endereco: usuario.endereco
      });
    }
  }


toggleSenha() {
  this.hideSenha = !this.hideSenha;
}

 salvar() {
  if (this.contaForm.invalid) {
    this.contaForm.markAllAsTouched();
    return;
  }

  this.usuarioService.atualizarConta(this.contaForm.value).subscribe({
    next: () => {
      this.dialog.open(Alerts, {
        data: 'Conta atualizada com sucesso!'
      });
    },
    error: (err) => {
      console.error(err);
      this.dialog.open(Alerts, {
        data: 'Erro ao atualizar conta'
      });
    }
  });
}


  voltarParaMinhaConta() {
    this.router.navigate(['/cliente/minha-Conta']); // ajuste para a rota correta
   }
}
