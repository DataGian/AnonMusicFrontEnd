import { Component } from '@angular/core';
import { ListarseguidoComponent } from './listarseguido/listarseguido.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seguido',
  imports: [ListarseguidoComponent, RouterOutlet],
  templateUrl: './seguido.component.html',
  styleUrl: './seguido.component.css'
})
export class SeguidoComponent {
  constructor(public route:ActivatedRoute) { }
}
