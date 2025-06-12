import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/notificacion';

@Component({
  selector: 'app-listarnotificaciones',
  imports: [MatTableModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css',
})
export class ListarnotificacionesComponent implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
