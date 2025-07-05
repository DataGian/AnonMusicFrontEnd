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
import { ReaccionService } from '../../../services/reaccion.service';
import { Reacciones } from '../../../models/reaccion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-listarreaccion',
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
  templateUrl: './listarreaccion.component.html',
  styleUrl: './listarreaccion.component.css',
})
export class ListarreaccionComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Reacciones> = new MatTableDataSource();
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
  constructor(private rS: ReaccionService) {}
  ngOnInit(): void {
      this.rS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.rS.list().subscribe((data) => {
    this.dataSource.data = data;

    this.dataSource.filterPredicate = (reaccion: Reacciones, filtro: string) => {
      const dataStr = `${reaccion.idReacciones} ${reaccion.publicaciones?.contenido || ''}`.toLowerCase();
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


  eliminar(id: number) {
    this.rS.deleteReaccion(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
