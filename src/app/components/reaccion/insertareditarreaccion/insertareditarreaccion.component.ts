import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../../services/publicacion.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Publicacion } from '../../../models/publicacion';
import { Usuario } from '../../../models/usuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { Reacciones } from '../../../models/reaccion';
import { ReaccionService } from '../../../services/reaccion.service';
@Component({
  selector: 'app-insertareditarreaccion',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './insertareditarreaccion.component.html',
  styleUrl: './insertareditarreaccion.component.css',
})
export class InsertareditarreaccionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reaccion: Reacciones = new Reacciones();
  edicion: boolean = false;
  status: boolean = false;
  id: number = 0;

  listaPublicaciones: Publicacion[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private rS: ReaccionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pS: PublicacionService,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      usuarioReaccion: ['', Validators.required],
      tipoReaccion: ['', Validators.required],
      publicacionReaccion: ['', Validators.required],
    });

    this.pS.list().subscribe((data) => {
      this.listaPublicaciones = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.reaccion.idReacciones = this.form.value.codigo;
      this.reaccion.idusuario = this.form.value.usuarioReaccion;
      this.reaccion.tipo = this.form.value.tipoReaccion;
      this.reaccion.publicaciones.idPublicacion =
        this.form.value.publicacionReaccion;

      if (this.edicion) {
        this.rS.update(this.reaccion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.reaccion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['reacciones']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idReacciones),
          usuarioReaccion: new FormControl(data.idusuario),
          tipoReaccion: new FormControl(data.tipo),
          publicacionReaccion: new FormControl(
            data.publicaciones.idPublicacion
          ),
        });
      });
    }
  }
}
