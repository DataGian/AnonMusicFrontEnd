import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';

@Component({
  selector: 'app-listarnotificaciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,           
    RouterLink,             
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css',
})
export class ListarnotificacionesComponent implements OnInit {
  dataSource: Notificacion[] = [];
  mostrarTexto = false;

  constructor(private nS: NotificacionService) {}

  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = data;
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = data;
    });
  }

  eliminar(id: number): void {
    this.nS.deleteNotificacion(id).subscribe(() => {
      this.nS.list().subscribe((data) => {
        this.dataSource = data;
      });
    });
  }
}
