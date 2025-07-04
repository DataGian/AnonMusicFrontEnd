import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Seguido } from '../../../models/seguido';
import { SeguidoComponent } from '../seguido.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeguidoService } from '../../../services/seguido.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listarseguido',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterLink, MatPaginator],
  templateUrl: './listarseguido.component.html',
  styleUrl: './listarseguido.component.css'
})
export class ListarseguidoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Seguido> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sS: SeguidoService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.deleteSeguido(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }

}
