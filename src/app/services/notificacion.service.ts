import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/notificacion';
import { Observable, Subject } from 'rxjs';
import { NotificacionesNoVistasDTO } from '../models/NotificacionesNoVistasDTO';

const base_url= environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url=`${base_url}/notificaciones`;
  private listaCambio = new Subject<Notificacion[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Notificacion[]>(`${this.url}/listado`);	
  }
  insert(n: Notificacion){
    return this.http.post<Notificacion>(`${this.url}/registrar`,n);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Notificacion[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id: number){
    return this.http.get<Notificacion>(`${this.url}/${id}`);
  }
  update(n: Notificacion){
    return this.http.put<Notificacion>(`${this.url}/modificar`,n);
  }
  deleteNotificacion(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getNotificacionesNoVistasPorTipo(): Observable<NotificacionesNoVistasDTO[]> {
    return this.http.get<NotificacionesNoVistasDTO[]>(`${this.url}/notificacionesnovistas`);
  }
}
