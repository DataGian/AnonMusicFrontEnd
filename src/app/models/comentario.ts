import { Publicacion } from "./publicacion"

export class Comentarios {
    idComentario: number = 0
    idusuArio: number = 0
    contenido: string = ""
    publicaciones: Publicacion = new Publicacion()
}