import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecomendacionComponent } from './listarrecomendacion/listarrecomendacion.component';

@Component({
  selector: 'app-recomendacion',
  imports: [RouterOutlet, ListarrecomendacionComponent],
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.css'
})
export class RecomendacionComponent {
  constructor(public route: ActivatedRoute) {}
}
