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
import { ReaccionService } from '../../../services/reaccion.service';
import { Reacciones } from '../../../models/reaccion';
@Component({
  selector: 'app-listarreaccion',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listarreaccion.component.html',
  styleUrl: './listarreaccion.component.css',
})
export class ListarreaccionComponent implements OnInit{
  dataSource: MatTableDataSource<Reacciones> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6'
  ];
  constructor(private rS: ReaccionService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rS.deleteReaccion(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
