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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { Asesoramientos } from '../../../models/asesoramiento';
import { AsesoramientoService } from '../../../services/asesoramiento.service';

@Component({
  selector: 'app-listarasesoramiento',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
  ],
  templateUrl: './listarasesoramiento.component.html',
  styleUrl: './listarasesoramiento.component.css',
})
export class ListarasesoramientoComponent implements OnInit {
  dataSource: MatTableDataSource<Asesoramientos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private aS: AsesoramientoService) {}
  ngOnInit(): void {
    this.aS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.aS.list().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = (
        asesoramiento: Asesoramientos,
        filtro: string
      ) => {
        const dataStr = `${asesoramiento.IdAsesoramiento} ${
          asesoramiento.musica?.nombre || ''
        } ${asesoramiento.usuario?.username || ''}`.toLowerCase();
        return dataStr.includes(filtro);
      };
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filtro;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    this.aS.deleteAsesoramiento(id).subscribe(() => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
}
