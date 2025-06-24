import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarnotificacionesxusuarioComponent } from './listarnotificacionesxusuario/listarnotificacionesxusuario.component';

@Component({
  selector: 'app-notificacionesxusuario',
  imports: [ListarnotificacionesxusuarioComponent,RouterOutlet],
  templateUrl: './notificacionesxusuario.component.html',
  styleUrl: './notificacionesxusuario.component.css'
})
export class NotificacionesxusuarioComponent {
  constructor(public route: ActivatedRoute){}

}
