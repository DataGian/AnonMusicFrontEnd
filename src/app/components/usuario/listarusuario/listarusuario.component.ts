import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
