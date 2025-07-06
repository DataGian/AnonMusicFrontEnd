import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Musica } from '../../../models/musica';
import { Usuario } from '../../../models/usuario';
import { MusicaService } from '../../../services/musica.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

function noFechaPasadaValidator(control: FormControl) {
  const inputDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Quitar la hora para comparación justa

  

  return inputDate > today ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-insertareditarmusica',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatDatepickerModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule],
  templateUrl: './insertareditarmusica.component.html',
  styleUrl: './insertareditarmusica.component.css'
})
export class InsertareditarmusicaComponent implements OnInit{
form: FormGroup = new FormGroup({});
musica: Musica = new Musica();
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
    private mS: MusicaService,
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
      archivo: ['', Validators.required],
      nombre: ['', Validators.required],
      fecha: ['', [Validators.required, noFechaPasadaValidator]],
      privacidad: ['', Validators.required],
      usuario: ['', Validators.required],
      usado: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.musica.idMusica = this.form.value.codigo;
      this.musica.archivo = this.form.value.archivo;
      this.musica.nombre = this.form.value.nombre;
      this.musica.fecha = this.form.value.fecha;
      this.musica.privacidad = this.form.value.privacidad;
      this.musica.usuario.idUsuario = this.form.value.usuario;
      this.musica.usado = this.form.value.usado;

      if (this.edicion) {
        this.mS.update(this.musica).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.musica).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['musicas']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idMusica),
          archivo: new FormControl(data.archivo),
          nombre: new FormControl(data.nombre),
          fecha: new FormControl(data.fecha),
          privacidad: new FormControl(data.privacidad),
          usuario: new FormControl(data.usuario.idUsuario),
          usado: new FormControl(data.usado),
        });
      });
    }
  }
}
