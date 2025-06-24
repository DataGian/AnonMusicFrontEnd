import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NotificacionxUsuario } from '../models/notificacionesxusuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NotificacionesxusuarioService {
  private url = `${base_url}/notificacionesxusuario`;
  private listaCambio = new Subject<NotificacionxUsuario[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<NotificacionxUsuario[]>(`${this.url}/listado`);
  }
  insert(nxu: NotificacionxUsuario) {
    return this.http.post(`${this.url}/registrar`, nxu);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva : NotificacionxUsuario[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<NotificacionxUsuario>(`${this.url}/${id}`);
  }
  update(nxu: NotificacionxUsuario) {
    return this.http.put<NotificacionxUsuario>(`${this.url}/modificar`, nxu);
  }
  deleteNotificacionxUsuario(id: number) {
    return this.http.delete<NotificacionxUsuario>(`${this.url}/${id}`);
  }
}
