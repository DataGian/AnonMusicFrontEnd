import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject } from 'rxjs';
import { UsuariosConMasMusicaAnonimaDTO } from '../models/UsuariosConMasMusicaAnonimaDTO';
import { UsuariosConMasNotificacionesNoLeidasDTO } from '../models/UsuariosConMasNotificacionesNoLeidasDTO';
import { UsuarioConPlaylistDTO } from '../models/UsuarioConPlaylistDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private listacambio=new Subject<Usuario[]>();
  private url = `${base_url}/usuarios`;

  constructor(private http: HttpClient) {}

  list(){ //lista usuarios
    return this.http.get<Usuario[]>(`${this.url}/lista`);
  }

  insert(u: Usuario){//registro usuario
    return this.http.post<Usuario>(`${this.url}/registrar`, u);
  }
  getList(){
    return this.listacambio.asObservable();
  }
  setList(listanueva: Usuario[]){
    this.listacambio.next(listanueva);
  }
  listId(id: number) { //lista usuario por id
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(u: Usuario) { //actualiza usuario
    return this.http.put<Usuario>(`${this.url}/modificar`, u);
  }
  deleteusuario(id:number) { //elimina usuario
    return this.http.delete<Usuario>(`${this.url}/${id}`);

  }
    getUsuariosConMusicaAnonima(): Observable<UsuariosConMasMusicaAnonimaDTO[]> {
    return this.http.get<UsuariosConMasMusicaAnonimaDTO[]>(`${this.url}/usuariosconmasmusicaanonima`)
  }
  getUsuariosConNotifiacionesNoLeidas(): Observable<UsuariosConMasNotificacionesNoLeidasDTO[]> {
    return this.http.get<UsuariosConMasNotificacionesNoLeidasDTO[]>(`${this.url}/usuariosconmasnotificacionesnoleidas`)
  }
  getUsuariosConPlaylist(): Observable<UsuarioConPlaylistDTO[]>{
    return this.http.get<UsuarioConPlaylistDTO[]>(`${this.url}/usuarioconplaylist`);
  }
}//cambio
