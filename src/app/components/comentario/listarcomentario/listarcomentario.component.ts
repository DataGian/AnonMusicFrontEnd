import { Component, OnInit } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';
import { Comentarios } from '../../../models/comentario';
@Component({
  selector: 'app-listarcomentario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css',
})
export class ListarcomentarioComponent implements OnInit {
  dataSource: MatTableDataSource<Comentarios> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6'
  ];
  constructor(private cS: ComentarioService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.deleteComentario(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
