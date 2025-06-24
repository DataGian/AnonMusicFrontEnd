import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Seguidores } from '../../../models/seguidores';
import { Usuario } from '../../../models/usuario';
import { SeguidoresService } from '../../../services/seguidores.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarseguidores',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatInputModule ,ReactiveFormsModule,MatLabel,MatFormFieldModule,MatSelectModule, MatRadioGroup, MatRadioButton, CommonModule ],
  templateUrl: './insertareditarseguidores.component.html',
  styleUrl: './insertareditarseguidores.component.css'
})
export class InsertareditarseguidoresComponent implements OnInit{
  seguidores: Seguidores = new Seguidores();
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private sS: SeguidoresService,
    private formBuilder: FormBuilder,
    private router: Router,
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
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
      usuarios: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.seguidores.idSeguidores =
        this.form.value.codigo;
      this.seguidores.fecha = this.form.value.fecha;
      this.seguidores.cantidad = this.form.value.cantidad;
      this.seguidores.usuario.idUsuario =
        this.form.value.usuarios;
      if (this.edicion) {
        this.sS.update(this.seguidores).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.seguidores).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['seguidores']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSeguidores),
          visto: new FormControl(data.fecha),
          fecha: new FormControl(data.cantidad),
          usuariosnxu: new FormControl(data.usuario.idUsuario)
        });
      });
    }
  }
} 
