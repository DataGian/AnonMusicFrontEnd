import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/notificacion';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarnotificaciones',
  imports: [MatTableModule,RouterLink,MatIconModule,MatCardModule,MatButtonModule,MatTooltipModule,RouterModule],
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
