import { Component } from '@angular/core';
import { Reporte5publicacionesconmascomentariosComponent } from './reporte5publicacionesconmascomentarios/reporte5publicacionesconmascomentarios.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [Reporte5publicacionesconmascomentariosComponent, RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
