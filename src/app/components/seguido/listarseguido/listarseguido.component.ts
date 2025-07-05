import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Seguido } from '../../../models/seguido';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeguidoService } from '../../../services/seguido.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-listarseguido',
  standalone: true,
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
  templateUrl: './listarseguido.component.html',
  styleUrl: './listarseguido.component.css'
})
export class ListarseguidoComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Seguido>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sS: SeguidoService) {}

  ngOnInit(): void {
        this.sS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.sS.list().subscribe((data) => {
    this.dataSource.data = data;

      // Filtro personalizado
      this.dataSource.filterPredicate = (seguido: Seguido, filtro: string) => {
        const dataStr = `
          ${seguido.idSeguidos}
          ${seguido.cantidad}
          ${seguido.usuario?.username || ''}
        `.toLowerCase();
        return dataStr.includes(filtro);
      };
    });
  }

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
    this.sS.deleteSeguido(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
