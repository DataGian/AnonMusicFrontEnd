import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  role: string = '';
  menuDesplegado = false; // NUEVO: controla visibilidad del menú

  constructor(private loginService: LoginService, private router: Router) {}

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isDeveloper() {
    return this.role === 'Developer';
  }

  isTester() {
    return this.role === 'Tester';
  }

  toggleMenu() {
    this.menuDesplegado = !this.menuDesplegado;
  }
}
