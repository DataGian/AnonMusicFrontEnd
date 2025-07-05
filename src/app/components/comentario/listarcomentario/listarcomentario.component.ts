import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';
import { Comentarios } from '../../../models/comentario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-listarcomentario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css',
})
export class ListarcomentarioComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<Comentarios> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cS: ComentarioService) {}
  ngOnInit(): void {
      this.cS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.cS.list().subscribe((data) => {
    this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.dataSource.filterPredicate = (comentario: Comentarios, filtro: string) => {
        const dataStr = `${comentario.idComentario} ${comentario.contenido} ${comentario.publicaciones?.contenido || ''}`.toLowerCase();
        return dataStr.includes(filtro);
      };
    });
  }

  filtrar(event: Event): void {
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
    this.cS.deleteComentario(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
