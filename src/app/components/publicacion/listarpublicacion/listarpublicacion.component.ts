import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Publicacion } from '../../../models/publicacion';
import { PublicacionService } from '../../../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarpublicacion',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarpublicacion.component.html',
  styleUrl: './listarpublicacion.component.css'
})
export class ListarpublicacionComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Publicacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pS: PublicacionService) {}

  ngOnInit(): void {
        this.pS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.pS.list().subscribe((data) => {
    this.dataSource.data = data;

      // Configurar filtro
      this.dataSource.filterPredicate = (data: Publicacion, filter: string) => {
  const privacidad = data.privacidad ? 'privado' : 'publico';
  const fecha = data.fechaPublicacion
    ? new Date(data.fechaPublicacion).toLocaleDateString('es-PE')
    : '';
  const dataStr = `
    ${data.idPublicacion}
    ${data.tipoPublicacion}
    ${fecha}
    ${privacidad}
    ${data.contenido}
    ${data.archivo}
    ${data.usuario?.username || ''}
  `.toLowerCase();

  return dataStr.includes(filter);
};


      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    this.pS.deletePublicacion(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
