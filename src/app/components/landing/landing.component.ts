import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ChatComponent,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MenuComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponentng  {
  title = 'AnonMusic';
  chatVisible = false;

  constructor(public router: Router) {}

  toggleChat(): void {
    this.chatVisible = !this.chatVisible;
  }

  closeChat(): void {
    this.chatVisible = false;
  }

  shouldShowMenu(): boolean {
    return this.router.url !== '/';
  }

  shouldShowLanding(): boolean {
    const rutasExcluidas = [
      '/usuarios',
      '/usuarios/insertareditar',
      '/usuarios/ediciones',
      '/notificaciones',
      '/notificaciones/insertar',
      '/notificaciones/ediciones',
      '/notificacionesxusuario',
      '/notificacionesxusuario/insertar',
      '/notificacionesxusuario/ediciones',
      '/seguidos',
      '/seguidos/insertareditar',
      '/seguidos/ediciones',
      '/publicaciones',
      '/publicaciones/insertareditar',
      '/publicaciones/ediciones',
      '/playlistsxusuario',
      '/playlistsxusuario/insertareditar',
      '/playlistsxusuario/ediciones',
      '/seguidores',
      '/seguidores/insertar',
      '/seguidores/ediciones',
      '/comentarios',
      '/comentarios/insertareditar',
      '/comentarios/ediciones',
      '/reportes',
      '/reportes/notificacionesnovistas',
      '/musicas',
      '/musicas/insertareditar',
      '/musicas/ediciones',
      '/recomendacion',
      '/recomendacion/insertareditar',
      '/recomendacion/ediciones',
    ];

    return (
      !rutasExcluidas.some((route) => this.router.url.startsWith(route)) &&
      !this.router.url.startsWith('/usuarios/ediciones') &&
      !this.router.url.startsWith('/notificaciones/ediciones') &&
      !this.router.url.startsWith('/notificacionesxusuario/ediciones') &&
      !this.router.url.startsWith('/seguidos/ediciones') &&
      !this.router.url.startsWith('/publicaciones/ediciones') &&
      !this.router.url.startsWith('/playlistsxusuario/ediciones') &&
      !this.router.url.startsWith('/seguidores/ediciones') &&
      !this.router.url.startsWith('/comentarios/ediciones')&&
      !this.router.url.startsWith('/musicas/ediciones') &&
      !this.router.url.startsWith('/recomendacion/ediciones')
    );
  }
}
