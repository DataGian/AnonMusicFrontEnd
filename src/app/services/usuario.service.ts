import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios/lista`;

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Usuario[]>(this.url);
  }
}
