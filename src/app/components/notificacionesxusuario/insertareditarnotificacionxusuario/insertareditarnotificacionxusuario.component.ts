import { Component, OnInit } from '@angular/core';
import { NotificacionxUsuario } from '../../../models/notificacionesxusuario';
import { NotificacionesxusuarioService } from '../../../services/notificacionesxusuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Notificacion } from '../../../models/notificacion';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../services/notificacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarnotificacionxusuario',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatDatepickerModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './insertareditarnotificacionxusuario.component.html',
  styleUrl: './insertareditarnotificacionxusuario.component.css',
})
export class InsertareditarnotificacionxusuarioComponent implements OnInit {
  notificacionxusuario: NotificacionxUsuario = new NotificacionxUsuario();
  form: FormGroup = new FormGroup({});
  listaNotificacion: Notificacion[] = [];
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;
  visto: boolean = true;

  constructor(
    private nxuS: NotificacionesxusuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private nS: NotificacionService,
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
      visto: ['', Validators.required],
      fecha: ['', Validators.required],
      usuariosnxu: ['', Validators.required],
      notificacionesnxu: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
    this.nS.list().subscribe(data => {
      this.listaNotificacion = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.notificacionxusuario.idNotificacionesxUsuario =
        this.form.value.codigo;
      this.notificacionxusuario.visto = this.form.value.visto;
      this.notificacionxusuario.fecha = this.form.value.fecha;
      this.notificacionxusuario.usuarios.idUsuario =
        this.form.value.usuariosnxu;
      this.notificacionxusuario.notificaciones.idNotificacion =
        this.form.value.notificacionesnxu;
      if (this.edicion) {
        this.nxuS.update(this.notificacionxusuario).subscribe(() => {
          this.nxuS.list().subscribe((data) => {
            this.nxuS.setList(data);
          });
        });
      } else {
        this.nxuS.insert(this.notificacionxusuario).subscribe(() => {
          this.nxuS.list().subscribe((data) => {
            this.nxuS.setList(data);
          });
        });
      }
      this.router.navigate(['notificacionesxusuario']);
    }
  }
  init() {
    if (this.edicion) {
      this.nxuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idNotificacionesxUsuario),
          visto: new FormControl(data.visto),
          fecha: new FormControl(data.fecha),
          usuariosnxu: new FormControl(data.usuarios.idUsuario),
          notificacionesnxu: new FormControl(
            data.notificaciones.idNotificacion
          ),
        });
      });
    }
  }
}
