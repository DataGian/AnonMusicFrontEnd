import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/notificacion';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarnotificaciones',
  imports: [MatTableModule,RouterLink,MatIconModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css',
})
export class ListarnotificacionesComponent implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number) {
    this.nS.deleteNotificacion(id).subscribe(() => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }
}
