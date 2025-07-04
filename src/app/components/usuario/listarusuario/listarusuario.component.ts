import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule,CommonModule,MatIconModule,MatButtonModule,RouterLink, MatPaginator, MatFormField, MatLabel, MatInput],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
  this.uS.list().subscribe((data) => {
    this.dataSource.data = data;
  });

  this.uS.getList().subscribe((data) => {
    this.dataSource.data = data;

    this.dataSource.filterPredicate = (usuario: Usuario, filtro: string) => {
  const estadoTexto = usuario.enabled ? 'activo' : 'inactivo';
  const dataStr = `
    ${usuario.idUsuario}
    ${usuario.email}
    ${usuario.username}
    ${estadoTexto}
  `.toLowerCase();

  return dataStr.includes(filtro);
    };
  });
}


  filtrar(event: Event) {
  const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filtro;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.uS.deleteusuario(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
