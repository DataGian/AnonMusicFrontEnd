import { Usuario } from "./usuario"

export class Publicacion {
    idPublicacion: number = 0
    tipoPublicacion: string = ""
    fechaPublicacion: Date = new Date()
    privacidad: boolean=false
    contenido: string = ""
    archivo: string = ""
    usuario:Usuario=new Usuario()
}