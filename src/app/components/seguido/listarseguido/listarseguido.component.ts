import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Seguido } from '../../../models/seguido';
import { SeguidoComponent } from '../seguido.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeguidoService } from '../../../services/seguido.service';

@Component({
  selector: 'app-listarseguido',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listarseguido.component.html',
  styleUrl: './listarseguido.component.css'
})
export class ListarseguidoComponent implements OnInit {
  dataSource: MatTableDataSource<Seguido> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private sS: SeguidoService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.sS.deleteSeguido(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }

}
