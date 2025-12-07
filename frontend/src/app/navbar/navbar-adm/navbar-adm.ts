import { Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar-adm.html',
  styleUrl: './navbar-adm.scss',
})
export class NavbarAdm {

   constructor(private router: Router) {}

  logout() {
    // Limpar dados do usuário/admin
    localStorage.removeItem('admin');
    // Redirecionar para a página home
    this.router.navigate(['/']);
  }
}
