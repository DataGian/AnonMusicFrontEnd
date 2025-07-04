import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Seguidores } from '../models/seguidores';
import { Subject } from 'rxjs';
const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})
export class SeguidoresService {
  private listacambio=new Subject<Seguidores[]>();
  private url = `${base_url}/seguidores`;
  constructor(private h: HttpClient) { }
  list() {
      return this.h.get<Seguidores[]>(`${this.url}/listado`);
    }
  
  insert(s: Seguidores) {
      return this.h.post(`${this.url}/registrar`, s);
    }
  getList() {
      return this.listacambio.asObservable();
    }
  setList(listaNueva: Seguidores[]) {
      this.listacambio.next(listaNueva);
    }
  
  listId(id: number) { 
        return this.h.get<Seguidores>(`${this.url}/${id}`);
      }
  update(s: Seguidores) { 
        return this.h.put<Seguidores>(`${this.url}/modificar`, s);
      }
  deleteSeguidores(id:number) { 
        return this.h.delete<Seguidores>(`${this.url}/${id}`);
    
      }
}
