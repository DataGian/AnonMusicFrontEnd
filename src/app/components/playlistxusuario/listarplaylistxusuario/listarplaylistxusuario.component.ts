import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlaylistxUsuario } from '../../../models/playlistxusuario';
import { PlaylistxusuarioService } from '../../../services/playlistxusuario.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';


@Component({
  selector: 'app-listarplaylistxusuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink, MatPaginator, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './listarplaylistxusuario.component.html',
  styleUrl: './listarplaylistxusuario.component.css'
})
export class ListarplaylistxusuarioComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<PlaylistxUsuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private pxS:PlaylistxusuarioService) { }

  ngOnInit(): void {
        this.pxS.getList().subscribe((data) => {
    this.dataSource.data = data;})

  this.pxS.list().subscribe((data) => {
    this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.dataSource.filterPredicate = (playlistsxusuario: PlaylistxUsuario, filtro: string) => {
        const dataStr = `${playlistsxusuario.idPlaylistsXUsuario} ${playlistsxusuario.archivo} ${playlistsxusuario.nombre} ${playlistsxusuario.usuarios?.username || ''}`.toLowerCase();
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
    this.pxS.deletePlaylistxUsuario(id).subscribe(() => {
      this.pxS.list().subscribe((data) => {
        this.pxS.setList(data);
      });
    });
  }


}
