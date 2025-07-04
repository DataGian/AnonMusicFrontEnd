import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recomendaciones } from '../models/recomendaciones';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
private url = `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendaciones[]>();
  constructor(private h: HttpClient) { }

  list() {
      return this.h.get<Recomendaciones[]>(`${this.url}/listado`);
    }
  
    insert(r: Recomendaciones) {
      return this.h.post(`${this.url}/registrar`, r);
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Recomendaciones[]) {
      this.listaCambio.next(listaNueva);
    }
  
    listId(id: number) {
      return this.h.get<Recomendaciones>(`${this.url}/${id}`);
    }
    update(r: Recomendaciones) {
      return this.h.put<Recomendaciones>(`${this.url}/modificar`, r);
    }
    deleterRecomendacion(id: number) {
      return this.h.delete<Recomendaciones>(`${this.url}/${id}`);
    }
}
