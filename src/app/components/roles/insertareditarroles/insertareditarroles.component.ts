import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-insertareditarroles',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './insertareditarroles.component.html',
  styleUrl: './insertareditarroles.component.css',
})
export class InsertareditarrolesComponent {
  form: FormGroup = new FormGroup({});
  rol: Roles = new Roles();
  edicion: boolean = false;
  id: number = 0;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Developer', viewValue: 'Developer' },
    { value: 'Asesor', viewValue: 'Asesor' },
    { value: 'Artista', viewValue: 'Artista' },
    { value: 'Analista de datos', viewValue: 'Analista de datos' },
  ];

  listaUsuarios: Usuario[] = [];

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuarioService,
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
      role: ['', Validators.required],
      usua: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo;
      this.rol.rol = this.form.value.role;
      this.rol.usuario.idUsuario = this.form.value.usua;
      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idRol),
          role: new FormControl(data.rol),
          usua: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}
