import { Component, OnInit } from '@angular/core';
import { PlaylistxUsuario } from '../../../models/playlistxusuario';
import { PlaylistxusuarioService } from '../../../services/playlistxusuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarplaylistxusuario',
    providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, CommonModule, MatFormFieldModule,MatSelectModule],
  templateUrl: './insertareditarplaylistxusuario.component.html',
  styleUrl: './insertareditarplaylistxusuario.component.css',
})
export class InsertareditarplaylistxusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  playlistxusuario: PlaylistxUsuario = new PlaylistxUsuario();
  edicion: boolean = false;
  id: number = 0;

  listaUsuarios: Usuario[] = [];

  constructor(
    private pxS: PlaylistxusuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      archivo: ['', Validators.required],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.playlistxusuario.idPlaylistsXUsuario = this.form.value.codigo;
      this.playlistxusuario.archivo = this.form.value.archivo;
      this.playlistxusuario.nombre = this.form.value.nombre;
      this.playlistxusuario.usuarios.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        this.pxS.update(this.playlistxusuario).subscribe(() => {
          this.pxS.list().subscribe((data) => {
            this.pxS.setList(data);
          });
        });
      } else {
        this.pxS.insert(this.playlistxusuario).subscribe(() => {
          this.pxS.list().subscribe((data) => {
            this.pxS.setList(data);
          });
        });
      }
      this.router.navigate(['/playlistsxusuario']);
    }
  }
  init() {
    if (this.edicion) {
      this.pxS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idPlaylistsXUsuario),
          archivo: new FormControl(data.archivo),
          nombre: new FormControl(data.nombre),
          usuario: new FormControl(data.usuarios.idUsuario),
        });
      });
    }
  }
}
