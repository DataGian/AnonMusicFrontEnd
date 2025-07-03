import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recomendaciones } from '../../../models/recomendaciones';
import { RecomendacionService } from '../../../services/recomendacion.service';

@Component({
  selector: 'app-listarrecomendacion',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listarrecomendacion.component.html',
  styleUrl: './listarrecomendacion.component.css'
})
export class ListarrecomendacionComponent implements OnInit{
dataSource: MatTableDataSource<Recomendaciones> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ];
  constructor(private rS: RecomendacionService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rS.deleterRecomendacion(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
