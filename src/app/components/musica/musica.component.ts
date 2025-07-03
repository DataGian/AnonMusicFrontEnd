import { Component } from '@angular/core';
import { ListarmusicaComponent } from "./listarmusica/listarmusica.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-musica',
  imports: [ListarmusicaComponent,RouterOutlet],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css'
})
export class MusicaComponent {
  constructor(public route: ActivatedRoute) {}

}
