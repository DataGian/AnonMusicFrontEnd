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
import { ComentarioService } from '../../../services/comentario.service';
import { Comentarios } from '../../../models/comentario';

@Component({
  selector: 'app-insertareditarcomentario',
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
  templateUrl: './insertareditarcomentario.component.html',
  styleUrl: './insertareditarcomentario.component.css',
})
export class InsertareditarcomentarioComponent implements OnInit{form: FormGroup = new FormGroup({});
  comentario: Comentarios = new Comentarios();
  edicion: boolean = false;
  status: boolean = false;
  id: number = 0;

  listaPublicaciones: Publicacion[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private cS: ComentarioService,
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
      usuarioComentario: ['', Validators.required],
      contenidoComentario: ['', Validators.required],
      publicacionComentario: ['', Validators.required],
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
      this.comentario.idComentario = this.form.value.codigo;
      this.comentario.idusuArio = this.form.value.usuarioComentario;
      this.comentario.contenido = this.form.value.contenidoComentario;
      this.comentario.publicaciones.idPublicacion = this.form.value.publicacionComentario;

      if (this.edicion) {
        this.cS.update(this.comentario).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comentario).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['comentarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idComentario),
          usuarioComentario: new FormControl(data.idusuArio),
          contenidoComentario: new FormControl(data.contenido),
          publicacionComentario: new FormControl(data.publicaciones.idPublicacion),
        });
      });
    }
  }}
