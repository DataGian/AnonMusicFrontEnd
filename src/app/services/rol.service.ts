import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Roles } from '../models/rol';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = `${base_url}/Roles`;
  private listaCambio = new Subject<Roles[]>();
  constructor(private h: HttpClient) { }

  list() {
      return this.h.get<Roles[]>(`${this.url}/listado`);
    }
  
    insert(r: Roles) {
      return this.h.post(`${this.url}/registrar`, r);
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Roles[]) {
      this.listaCambio.next(listaNueva);
    }
  
    listId(id: number) {
      return this.h.get<Roles>(`${this.url}/${id}`);
    }
    update(r: Roles) {
      return this.h.put<Roles>(`${this.url}/modificar`, r);
    }
    deleteRol(id: number) {
      return this.h.delete<Roles>(`${this.url}/${id}`);
    }

}
