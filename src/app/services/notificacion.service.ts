import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/notificacion';

const base_url= environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url=`${base_url}/notificaciones/listado`;

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Notificacion[]>(this.url);
  }
}
