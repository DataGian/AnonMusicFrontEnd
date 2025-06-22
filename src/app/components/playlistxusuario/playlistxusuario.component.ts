import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarplaylistxusuarioComponent } from './listarplaylistxusuario/listarplaylistxusuario.component';

@Component({
  selector: 'app-playlistxusuario',
  imports: [ListarplaylistxusuarioComponent, RouterOutlet],
  templateUrl: './playlistxusuario.component.html',
  styleUrl: './playlistxusuario.component.css'
})
export class PlaylistxusuarioComponent {
  constructor(public route: ActivatedRoute) { 
  }
}
