import { Injectable } from '@angular/core';
import { Seguido } from '../models/seguido';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class SeguidoService {
  private listacambio=new Subject<Seguido[]>();
    private url = `${base_url}/seguidos`;

  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Seguido[]>(`${this.url}/listado`);
  }

  insert(s: Seguido) {
    return this.h.post(`${this.url}/insert`, s);
  }

  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: Seguido[]) {
    this.listacambio.next(listaNueva);
  }

  listId(id: number) { //lista usuario por id
      return this.h.get<Seguido>(`${this.url}/${id}`);
    }
    update(u: Seguido) { //actualiza usuario
      return this.h.put<Seguido>(`${this.url}/modificar`, u);
    }
    deleteusuario(id:number) { //elimina usuario
      return this.h.delete<Seguido>(`${this.url}/${id}`);
  
    }
}
