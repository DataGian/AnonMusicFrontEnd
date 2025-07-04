import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Seguidores } from '../../../models/seguidores';
import { SeguidoresService } from '../../../services/seguidores.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-listarseguidores',
  imports: [RouterLink,CommonModule,MatTableModule, RouterLink, MatIconModule, MatButtonModule, MatIconModule, MatPaginator, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './listarseguidores.component.html',
  styleUrl: './listarseguidores.component.css'
})
export class ListarseguidoresComponent implements OnInit, AfterViewInit{

  dataSource: MatTableDataSource<Seguidores> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sS: SeguidoresService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Asignamos una nueva instancia
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.dataSource.filterPredicate = (seguidor: Seguidores, filtro: string) => {
        const dataStr = `${seguidor.idSeguidores} ${seguidor.cantidad} ${seguidor.usuario?.username || ''}`.toLowerCase();
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
    this.sS.deleteSeguidores(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
