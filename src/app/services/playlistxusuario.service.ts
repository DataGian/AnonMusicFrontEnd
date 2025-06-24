import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PlaylistxUsuario } from '../models/playlistxusuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PlaylistxusuarioService {
  private url = `${base_url}/playlistsxusuario`;
  private listaCambio = new Subject<PlaylistxUsuario[]>();

  constructor(private h: HttpClient) {}

  list() {
    return this.h.get<PlaylistxUsuario[]>(`${this.url}/listado`);
  }

  insert(px: PlaylistxUsuario) {
    return this.h.post(`${this.url}/registrar`, px);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: PlaylistxUsuario[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) { 
        return this.h.get<PlaylistxUsuario>(`${this.url}/${id}`);
      }
      update(px: PlaylistxUsuario) { 
        return this.h.put<PlaylistxUsuario>(`${this.url}/modificar`, px);
      }
      deletePlaylistxUsuario(id:number) { 
        return this.h.delete<PlaylistxUsuario>(`${this.url}/${id}`);
    
      }
}
