import { Component } from '@angular/core';
import { ListarreaccionComponent } from './listarreaccion/listarreaccion.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reaccion',
  imports: [ListarreaccionComponent, RouterOutlet],
  templateUrl: './reaccion.component.html',
  styleUrl: './reaccion.component.css',
})
export class ReaccionComponent {
  constructor(public route: ActivatedRoute) {}
}
