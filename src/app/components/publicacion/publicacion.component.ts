import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpublicacionComponent } from './listarpublicacion/listarpublicacion.component';

@Component({
  selector: 'app-publicacion',
  imports: [ListarpublicacionComponent, RouterOutlet],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent {
  constructor(public route: ActivatedRoute) {
}
}
