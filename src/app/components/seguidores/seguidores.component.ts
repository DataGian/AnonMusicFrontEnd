import { Component } from '@angular/core';
import { ListarusuarioComponent } from "../usuario/listarusuario/listarusuario.component";
import { ListarseguidoresComponent } from "./listarseguidores/listarseguidores.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seguidores',
  imports: [RouterOutlet, ListarseguidoresComponent],
  templateUrl: './seguidores.component.html',
  styleUrl: './seguidores.component.css'
})
export class SeguidoresComponent {
constructor(public route:ActivatedRoute){}
}
