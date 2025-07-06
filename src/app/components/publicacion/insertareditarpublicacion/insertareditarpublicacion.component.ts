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
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function maxPalabrasValidator(maxPalabras: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const texto: string = control.value || '';
    const palabras = texto.trim().split(/\s+/).filter((palabra: string) => palabra.length > 0);
    const cantidadPalabras = palabras.length;

    return cantidadPalabras > maxPalabras
      ? { maxPalabras: { actual: cantidadPalabras, max: maxPalabras } }
      : null;
  };
}


function noFechaPasadaValidator(control: FormControl) {
  const inputDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Quitar la hora para comparación justa

  

  return inputDate > today ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-insertareditarpublicacion',
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
  templateUrl: './insertareditarpublicacion.component.html',
  styleUrl: './insertareditarpublicacion.component.css',
})
export class InsertareditarpublicacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  publicacion: Publicacion = new Publicacion();
  edicion: boolean = false;
  status: boolean = false;
  id: number = 0;

  listaUsuarios: Usuario[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'texto', viewValue: 'Texto' },
    { value: 'imagen', viewValue: 'Imagen' },
    { value: 'video', viewValue: 'Video' },
    { value: 'audio', viewValue: 'Audio' },
  ];

  constructor(
    private pS: PublicacionService,
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
      tipoPublicacion: ['', Validators.required],
      fechaPublicacion: ['', [Validators.required, noFechaPasadaValidator]],
      privacidad: ['', Validators.required],
      contenido: ['', [Validators.required, maxPalabrasValidator(200)]],
      archivo: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.publicacion.idPublicacion = this.form.value.codigo;
      this.publicacion.tipoPublicacion = this.form.value.tipoPublicacion;
      this.publicacion.fechaPublicacion = this.form.value.fechaPublicacion;
      this.publicacion.privacidad = this.form.value.privacidad;
      this.publicacion.contenido = this.form.value.contenido;
      this.publicacion.archivo = this.form.value.archivo;
      this.publicacion.usuario.idUsuario = this.form.value.usuario;

      if (this.edicion) {
        this.pS.update(this.publicacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.publicacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['publicaciones']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idPublicacion),
          tipoPublicacion: new FormControl(data.tipoPublicacion),
          fechaPublicacion: new FormControl(data.fechaPublicacion),
          privacidad: new FormControl(data.privacidad),
          contenido: new FormControl(data.contenido),
          archivo: new FormControl(data.archivo),
          usuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}
