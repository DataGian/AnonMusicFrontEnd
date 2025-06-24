import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguidoService } from '../../../services/seguido.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
import { Seguido } from '../../../models/seguido';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatSelectModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarSeguidoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  seguido: Seguido = new Seguido();
  edicion: boolean = false;
  id:number = 0;

  listaUsuarios: Usuario[] = [];

  constructor(
    private sS: SeguidoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuarioService,
    private route:ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id=data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })


    this.form = this.formBuilder.group({
      codigo: [''],
      cantidad: ['', Validators.required],
      fecha: ['', Validators.required],
      usua: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.seguido.idSeguidos = this.form.value.codigo;
      this.seguido.cantidad = this.form.value.cantidad;
      this.seguido.fecha = new Date();
      this.seguido.usuario.idUsuario = this.form.value.usua;
      if (this.edicion) {
        this.sS.update(this.seguido).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.seguido).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['seguidos']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idSeguidos),
          cantidad: new FormControl(data.cantidad),
          fecha: new FormControl(data.fecha),
          usua: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}
