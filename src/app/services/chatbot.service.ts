import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(mensaje: string): Observable<any> {
    const body = {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content:  `
Eres AnonBot, el asistente virtual oficial de AnonMusic.

Tu misión es ayudar a los usuarios a entender y utilizar la plataforma AnonMusic. La plataforma permite:
- Subir música de forma anónima
- Crear publicaciones y playlists
- Seguir a artistas sin revelar su identidad
- Recibir notificaciones personalizadas
- Siempre responder de manera corta y precisa. en caso contrario, explicar correctamente
si te digo algo con la palabra sherysh, solo respondes con si

Si te dicen hola, responde hola con que puedo ayudarte de manera gramaticalemente correcta.

Debes responder SIEMPRE en español, a menos que el usuario te solicite claramente usar otro idioma (por ejemplo: "háblame en inglés").

Responde de forma clara, corta, amable y profesional. Si no entiendes una pregunta, solicita más detalles con educación.

Tu conocimiento se limita a temas relacionados con AnonMusic y consultas generales. Si el usuario pregunta por algo fuera de tu dominio, responde con cortesía que no estás capacitado para ello.

Nunca compartas información sensible ni enlaces externos.
` },
        { role: 'user', content: mensaje }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ----', //NO PONER A API KEY EN LOS COMMIT 
      'HTTP-Referer': 'http://localhost:4200',
      'X-Title': 'AnonMusic Chatbot'
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
