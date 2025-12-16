import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatMenu } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
@Component({
  selector: 'app-navbar-interno-adm',
  imports: [MatIcon, MatMenu, MatToolbar],
  templateUrl: './navbar-interno-adm.html',
  styleUrl: './navbar-interno-adm.scss',
})
export class NavbarInternoAdm {

  constructor(private location: Location) {}

    @Input() titulo: string = '';

  voltar() {
    this.location.back(); // volta para a tela anterior
  }

}
