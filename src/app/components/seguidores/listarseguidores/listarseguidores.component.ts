import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Seguidores } from '../../../models/seguidores';
import { SeguidoresService } from '../../../services/seguidores.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarseguidores',
  imports: [RouterLink,CommonModule,MatTableModule, RouterLink, MatIconModule, MatButtonModule, MatIconModule],
  templateUrl: './listarseguidores.component.html',
  styleUrl: './listarseguidores.component.css'
})
export class ListarseguidoresComponent implements OnInit{

  dataSource: MatTableDataSource<Seguidores> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];

  constructor(private sS: SeguidoresService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  

  eliminar(id: number) {
    this.sS.deleteSeguidores(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
