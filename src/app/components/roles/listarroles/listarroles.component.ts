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
import { Roles } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css',
})
export class ListarrolesComponent implements OnInit,AfterViewInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RolService) {}

  ngOnInit(): void {
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = (
        roles: Roles,
        filtro: string
      ) => {
        const dataStr = `
          ${roles.idRol}
          ${roles.rol}
          ${roles.usuario?.username || ''}
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
    const filtro = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    this.rS.deleteRol(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
