import { Component } from '@angular/core';
import { ListarasesoramientoComponent } from "./listarasesoramiento/listarasesoramiento.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-asesoramiento',
  imports: [ListarasesoramientoComponent, RouterOutlet],
  templateUrl: './asesoramiento.component.html',
  styleUrl: './asesoramiento.component.css'
})
export class AsesoramientoComponent {
  constructor(public route: ActivatedRoute) {}
}
