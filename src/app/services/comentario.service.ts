import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Comentarios } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url = `${base_url}/Comentarios`;
  private listaCambio = new Subject<Comentarios[]>();
  constructor(private h: HttpClient) { }

  list() {
      return this.h.get<Comentarios[]>(`${this.url}/listado`);
    }
  
    insert(c: Comentarios) {
      return this.h.post(`${this.url}/registrar`, c);
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Comentarios[]) {
      this.listaCambio.next(listaNueva);
    }
  
    listId(id: number) {
      return this.h.get<Comentarios>(`${this.url}/${id}`);
    }
    update(c: Comentarios) {
      return this.h.put<Comentarios>(`${this.url}/modificar`, c);
    }
    deleteComentario(id: number) {
      return this.h.delete<Comentarios>(`${this.url}/${id}`);
    }
}
