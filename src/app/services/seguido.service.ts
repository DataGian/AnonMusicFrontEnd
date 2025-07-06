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
    private url = `${base_url}/Seguidos`;

  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Seguido[]>(`${this.url}/listado`);
  }

  insert(s: Seguido) {
    return this.h.post(`${this.url}/registrar`, s);
  }

  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: Seguido[]) {
    this.listacambio.next(listaNueva);
  }

  listId(id: number) { 
      return this.h.get<Seguido>(`${this.url}/${id}`);
    }
    update(s: Seguido) { 
      return this.h.put<Seguido>(`${this.url}/modificar`, s);
    }
    deleteSeguido(id:number) { 
      return this.h.delete<Seguido>(`${this.url}/${id}`);
  
    }
}
