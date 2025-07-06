import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarnotificacionesComponent } from './listarnotificaciones/listarnotificaciones.component';

@Component({
  selector: 'app-notificacion',
  imports: [ListarnotificacionesComponent,RouterOutlet],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
constructor(public route:ActivatedRoute) {}
}
