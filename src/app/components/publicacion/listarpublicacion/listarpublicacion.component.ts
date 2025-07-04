import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Publicacion } from '../../../models/publicacion';
import { PublicacionService } from '../../../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarpublicacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listarpublicacion.component.html',
  styleUrl: './listarpublicacion.component.css'
})
export class ListarpublicacionComponent implements OnInit {
  dataSource: MatTableDataSource<Publicacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private pS: PublicacionService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.pS.deletePublicacion(id).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }


}
