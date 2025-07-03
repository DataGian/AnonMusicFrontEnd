import { CommonModule } from '@angular/common';
import { Component, contentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Recomendaciones } from '../../../models/recomendaciones';
import { PlaylistxUsuario } from '../../../models/playlistxusuario';
import { RecomendacionService } from '../../../services/recomendacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlaylistxusuarioService } from '../../../services/playlistxusuario.service';

@Component({
  selector: 'app-insertareditarrecomendacion',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatDatepickerModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
  MatIconModule,],
  templateUrl: './insertareditarrecomendacion.component.html',
  styleUrl: './insertareditarrecomendacion.component.css'
})
export class InsertareditarrecomendacionComponent implements OnInit{
form: FormGroup = new FormGroup({});
recomendacion: Recomendaciones = new Recomendaciones();
edicion: boolean = false;
status: boolean = false;
id: number = 0;
listaplaylist: PlaylistxUsuario[] = [];
constructor(
    private rS: RecomendacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pS: PlaylistxusuarioService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      contenido: ['', Validators.required],
      razon: ['', Validators.required],
      vista: ['', Validators.required],
      PlaylistxUsuario: ['', Validators.required],
    });
    this.pS.list().subscribe((data) => {
      this.listaplaylist = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.recomendacion.idRecomendacion = this.form.value.codigo;
      this.recomendacion.contenido = this.form.value.contenido;
      this.recomendacion.razon = this.form.value.razon;
      this.recomendacion.vista = this.form.value.vista;
      this.recomendacion.playlistxUsuario.idPlaylistsXUsuario = this.form.value.PlaylistxUsuario;

      if (this.edicion) {
        this.rS.update(this.recomendacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recomendacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['musicas']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idRecomendacion),
          contenido: new FormControl(data.contenido),
          razon: new FormControl(data.razon),
          vista: new FormControl(data.vista),
          PlaylistxUsuario: new FormControl(data.playlistxUsuario.idPlaylistsXUsuario),
        });
      });
    }
  }
}
