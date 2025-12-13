import { Component, OnInit } from '@angular/core';
import { NavbarPublico } from "../navbar/navbar-publico/navbar-publico";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-publico',
  imports: [NavbarPublico, RouterOutlet ],
  templateUrl: './layout-publico.html',
  styleUrl: './layout-publico.scss',
})
export class LayoutPublico implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // ⬅️ força ir para o topo
      }
    });
  }

}


