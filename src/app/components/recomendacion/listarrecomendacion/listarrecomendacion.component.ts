import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionService } from '../../../services/recomendacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarrecomendacion',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarrecomendacion.component.html',
  styleUrl: './listarrecomendacion.component.css'
})
export class ListarrecomendacionComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RecomendacionService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = (recomendacion: Recomendaciones, filtro: string) => {
        const dataStr = `
          ${recomendacion.idRecomendacion}
          ${recomendacion.contenido}
          ${recomendacion.razon}
          ${recomendacion.playlistxUsuario?.nombre || ''}
        `.toLowerCase();
        return dataStr.includes(filtro);
      };
    });

    // Escuchar cambios globales
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
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
    this.rS.deleterRecomendacion(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
