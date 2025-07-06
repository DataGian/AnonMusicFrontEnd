import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormControl } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-insertare  ditar',
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, FormsModule,CommonModule,MatRadioModule,MatIconModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado: boolean = false;
  id:number=0;
  edicion: boolean = false;

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
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
      email: ['', Validators.required],
      enabled: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.email = this.form.value.email;
      this.usuario.enabled = this.form.value.enabled;
      this.usuario.password = this.form.value.password;
      this.usuario.username = this.form.value.username;
      if(this.edicion){
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });  
        })
      }
      else{
      this.uS.insert(this.usuario).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
    }
    this.router.navigate(['usuarios']);
  }
}
  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigo:new FormControl(data.idUsuario),
        email: new FormControl(data.email),
        enabled: new FormControl(data.enabled),
        password: new FormControl(data.password),
        username: new FormControl(data.username),
      })
      })
    }
  }
}
