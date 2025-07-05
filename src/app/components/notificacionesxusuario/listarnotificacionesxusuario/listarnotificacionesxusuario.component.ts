import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificacionxUsuario } from '../../../models/notificacionesxusuario';
import { NotificacionesxusuarioService } from '../../../services/notificacionesxusuario.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-listarnotificacionesxusuario',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
    MatLabel
  ],
  templateUrl: './listarnotificacionesxusuario.component.html',
  styleUrl: './listarnotificacionesxusuario.component.css'
})
export class ListarnotificacionesxusuarioComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<NotificacionxUsuario>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private nxuS: NotificacionesxusuarioService) {}

  ngOnInit(): void {
    this.nxuS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.nxuS.list().subscribe((data) => {
    this.dataSource.data = data;

  this.dataSource.filterPredicate = (notificacionesxusuario: NotificacionxUsuario, filtro: string) => {
    const dataStr = `
      ${notificacionesxusuario.idNotificacionesxUsuario}
      ${notificacionesxusuario.visto}
      ${notificacionesxusuario.usuarios?.username || ''}
      ${notificacionesxusuario.notificaciones?.mensajeNotificacion || ''}
    `.toLowerCase();
    return dataStr.includes(filtro);
  };
});

      };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number): void {
    this.nxuS.deleteNotificacionxUsuario(id).subscribe(() => {
      this.nxuS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
