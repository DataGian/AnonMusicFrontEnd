import { Notificacion } from './notificacion';
import { Usuario } from './usuario';
export class NotificacionxUsuario{
    idNotificacionesxUsuario:number=0;
    visto:boolean=false;
    fecha:Date=new Date();
    usuarios:Usuario = new Usuario();
    notificaciones:Notificacion=new Notificacion();
}