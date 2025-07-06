import { Component, OnInit } from '@angular/core';
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
import { Asesoramientos } from '../../../models/asesoramiento';
import { Musica } from '../../../models/musica';
import { AsesoramientoService } from '../../../services/asesoramiento.service';
import { MusicaService } from '../../../services/musica.service';

@Component({
  selector: 'app-insertareditarasesoramiento',
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './insertareditarasesoramiento.component.html',
  styleUrl: './insertareditarasesoramiento.component.css',
})
export class InsertareditarasesoramientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  asesoramiento: Asesoramientos = new Asesoramientos();
  edicion: boolean = false;
  status: boolean = false;
  id: number = 0;

  listaMusica: Musica[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private aS: AsesoramientoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mS: MusicaService,
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
      usuarioAsesoramiento: ['', Validators.required],
      musicaAsesoramiento: ['', Validators.required],
      fechaSolicitudAsesoramiento: ['', Validators.required],
      fechaAtendidoAsesoramiento: ['', Validators.required],
    });

    this.mS.list().subscribe((data) => {
      this.listaMusica = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.asesoramiento.IdAsesoramiento = this.form.value.codigo;
      this.asesoramiento.usuario.idUsuario =
        this.form.value.usuarioAsesoramiento;
      this.asesoramiento.musica.idMusica = this.form.value.musicaAsesoramiento;
      this.asesoramiento.fechaSolicitud =
        this.form.value.fechaSolicitudAsesoramiento;
      this.asesoramiento.fechaAtendido =
        this.form.value.fechaAtendidoAsesoramiento;

      if (this.edicion) {
        this.aS.update(this.asesoramiento).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.asesoramiento).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['asesoramientos']);
    }
  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.IdAsesoramiento),
          usuarioAsesoramiento: new FormControl(data.usuario.idUsuario),
          musicaAsesoramiento: new FormControl(data.musica.idMusica),
          fechaSolicitudAsesoramiento: new FormControl(data.fechaSolicitud),
          fechaAtendidoAsesoramiento: new FormControl(data.fechaAtendido),
        });
      });
    }
  }
}
