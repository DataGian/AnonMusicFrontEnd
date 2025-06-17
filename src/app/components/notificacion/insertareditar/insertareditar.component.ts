import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Notificacion } from '../../../models/notificacion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertareditar',
  imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule,MatInputModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarNotificacionComponent implements OnInit {
  notificacion: Notificacion = new Notificacion();
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private nS: NotificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
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
      tipo: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.notificacion.idNotificacion = this.form.value.codigo;
      this.notificacion.tipoNotificacion = this.form.value.tipo;
      this.notificacion.mensajeNotificacion = this.form.value.mensaje;
      if (this.edicion) {
        this.nS.update(this.notificacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.notificacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
      this.router.navigate(['notificaciones']);
    }
  }
  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idNotificacion),
          tipo: new FormControl(data.tipoNotificacion),
          mensaje: new FormControl(data.mensajeNotificacion),
        });
      });
    }
  }
}
