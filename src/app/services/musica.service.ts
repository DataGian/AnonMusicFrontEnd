import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Musica } from '../models/musica';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MusicaService {
private url = `${base_url}/Musica`;
  private listaCambio = new Subject<Musica[]>();
  constructor(private h: HttpClient) {}

  list() {
    return this.h.get<Musica[]>(`${this.url}/listado`);
  }

  insert(m: Musica) {
    return this.h.post(`${this.url}/registrar`, m);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Musica[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) { 
        return this.h.get<Musica>(`${this.url}/${id}`);
      }
  update(m: Musica) { 
        return this.h.put<Musica>(`${this.url}/modificar`, m);
      }
  deleteMusica(id:number) { 
        return this.h.delete<Musica>(`${this.url}/${id}`);
    
      }
}
