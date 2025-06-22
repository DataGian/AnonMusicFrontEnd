import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlaylistxUsuario } from '../../../models/playlistxusuario';
import { PlaylistxusuarioService } from '../../../services/playlistxusuario.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarplaylistxusuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listarplaylistxusuario.component.html',
  styleUrl: './listarplaylistxusuario.component.css'
})
export class ListarplaylistxusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<PlaylistxUsuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  constructor(private pxS:PlaylistxusuarioService) { }

  ngOnInit(): void {
    this.pxS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pxS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.pxS.deletePlaylistxUsuario(id).subscribe(() => {
      this.pxS.list().subscribe((data) => {
        this.pxS.setList(data);
      });
    });
  }


}
