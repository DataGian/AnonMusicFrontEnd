import { Usuario } from "./usuario"
export class Musica {
    idMusica:number=0
    archivo:string=""
    nombre:string=""
    fecha:Date = new Date()
    privacidad:boolean=false
    usuario:Usuario = new Usuario();
    usado:boolean=false
}