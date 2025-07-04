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

@Component({
  selector: 'app-listarnotificacionesxusuario',
  imports: [MatTableModule,CommonModule,RouterLink,MatIconModule,MatButtonModule,  MatPaginator],
  templateUrl: './listarnotificacionesxusuario.component.html',
  styleUrl: './listarnotificacionesxusuario.component.css'
})
export class ListarnotificacionesxusuarioComponent implements OnInit, AfterViewInit{

  dataSource: MatTableDataSource<NotificacionxUsuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private nxuS:NotificacionesxusuarioService){}

  ngOnInit(): void {
    this.nxuS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.nxuS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.nxuS.deleteNotificacionxUsuario(id).subscribe(() => {
      this.nxuS.list().subscribe((data) => {
        this.nxuS.setList(data);
      });
    });
  }
}
