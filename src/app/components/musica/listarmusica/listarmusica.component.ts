import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Musica } from '../../../models/musica';
import { MusicaService } from '../../../services/musica.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-listarmusica',
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
  templateUrl: './listarmusica.component.html',
  styleUrl: './listarmusica.component.css'
})
export class ListarmusicaComponent implements OnInit, AfterViewInit {
dataSource: MatTableDataSource<Musica> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private mS:MusicaService){}
  ngOnInit(): void {
  this.mS.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);

    this.dataSource.filterPredicate = (musica: Musica, filtro: string) => {
      const privacidad = musica.privacidad ? 'privado' : 'publico';
      const usado = musica.usado ? 'sí' : 'no';
      const dataStr = `${musica.idMusica} ${musica.archivo} ${musica.nombre} ${privacidad} ${usado} ${musica.usuario?.username || ''}`.toLowerCase();
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
    this.mS.deleteMusica(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
}
