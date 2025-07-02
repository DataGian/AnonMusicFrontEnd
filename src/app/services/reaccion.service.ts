import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Reacciones } from '../models/reaccion';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReaccionService {
  private url = `${base_url}/reacciones`;
  private listaCambio = new Subject<Reacciones[]>();
  constructor(private h: HttpClient) {}
  list() {
    return this.h.get<Reacciones[]>(`${this.url}/listado`);
  }

  insert(r: Reacciones) {
    return this.h.post(`${this.url}/registrar`, r);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Reacciones[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.h.get<Reacciones>(`${this.url}/${id}`);
  }
  update(r: Reacciones) {
    return this.h.put<Reacciones>(`${this.url}/modificar`, r);
  }
  deleteReaccion(id: number) {
    return this.h.delete<Reacciones>(`${this.url}/${id}`);
  }
}
