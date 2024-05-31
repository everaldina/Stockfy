import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shared.module';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../modules/auth/autenticacao.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', route: '/' },
    { label: 'Produtos', icon: 'pi pi-fw pi-list', route: '/produtos' },
  ];

  constructor(private router: Router, private autenticacao: AutenticacaoService) {}

  toRoute(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    return this.autenticacao.logout();
  }

  isLoggedIn() {
    return this.autenticacao.isLoggedIn();
  }
}
