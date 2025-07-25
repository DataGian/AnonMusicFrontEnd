import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Publicacion } from '../models/publicacion';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PublicacionesConMasComentariosDTO } from '../models/PublicacionesConMasComentariosDTO';
import { PublicacionesFechasIngresadasDTO } from '../models/PublicacionesFechasIngresadasDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private url = `${base_url}/publicaciones`;
  private listaCambio = new Subject<Publicacion[]>();
  constructor(private h: HttpClient) {}

  list() {
    return this.h.get<Publicacion[]>(`${this.url}/listado`);
  }

  insert(p: Publicacion) {
    return this.h.post(`${this.url}/registrar`, p);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Publicacion[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) { 
      return this.h.get<Publicacion>(`${this.url}/${id}`);
    }
  update(p: Publicacion) { 
      return this.h.put<Publicacion>(`${this.url}/modificar`, p);
    }
  deletePublicacion(id:number) { 
      return this.h.delete<Publicacion>(`${this.url}/${id}`);
    }

  get5PubliconmasComentarios(): Observable<PublicacionesConMasComentariosDTO[]> {
    return this.h.get<PublicacionesConMasComentariosDTO[]>(`${this.url}/publicacionesconmascomentarios`);
  }
   getPublicacionesFechasIngresadas(fecha: string): Observable<PublicacionesFechasIngresadasDTO[]> {
  const params = { fechaingresada: fecha };
  return this.h.get<PublicacionesFechasIngresadasDTO[]>(`${this.url}/publicacionesporfecha`, { params });
}
}
