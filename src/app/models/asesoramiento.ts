import { Musica } from "./musica"
import { Usuario } from "./usuario"

export class Asesoramientos{
    IdAsesoramiento: number = 0
    fechaSolicitud: Date = new Date()
    musica: Musica = new Musica()
    fechaAtendido: Date = new Date()
    usuario: Usuario = new Usuario()
}