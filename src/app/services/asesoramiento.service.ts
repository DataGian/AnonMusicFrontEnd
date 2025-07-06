import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Asesoramientos } from '../models/asesoramiento';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AsesoramientoService {
private url = `${base_url}/Asesoramientos`;
  private listaCambio = new Subject<Asesoramientos[]>();
  constructor(private h: HttpClient) {}
  list() {
    return this.h.get<Asesoramientos[]>(`${this.url}/listado`);
  }

  insert(a: Asesoramientos) {
    return this.h.post(`${this.url}/registrar`, a);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Asesoramientos[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.h.get<Asesoramientos>(`${this.url}/${id}`);
  }
  update(a: Asesoramientos) {
    return this.h.put<Asesoramientos>(`${this.url}/modificar`, a);
  }
  deleteAsesoramiento(id: number) {
    return this.h.delete<Asesoramientos>(`${this.url}/${id}`);
  }
}

