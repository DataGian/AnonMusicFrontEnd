import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificacionxUsuario } from '../../../models/notificacionesxusuario';
import { NotificacionesxusuarioService } from '../../../services/notificacionesxusuario.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarnotificacionesxusuario',
  imports: [MatTableModule,CommonModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listarnotificacionesxusuario.component.html',
  styleUrl: './listarnotificacionesxusuario.component.css'
})
export class ListarnotificacionesxusuarioComponent implements OnInit{

  dataSource: MatTableDataSource<NotificacionxUsuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];

  constructor(private nxuS:NotificacionesxusuarioService){}

  ngOnInit(): void {
    this.nxuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.nxuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.nxuS.deleteNotificacionxUsuario(id).subscribe(() => {
      this.nxuS.list().subscribe((data) => {
        this.nxuS.setList(data);
      });
    });
  }
}
