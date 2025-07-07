import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private http: HttpClient) {}

  sendMessage(mensaje: string): Observable<any> {
    const body = {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente virtual de la aplicación AnonMusic, una plataforma diseñada para ayudar a jóvenes a compartir su talento musical de forma anónima, sin necesidad de revelar su identidad. Tu única función es responder preguntas sobre el uso, funcionamiento, características, beneficios y seguridad de la aplicación AnonMusic.

No respondas preguntas que no estén relacionadas con la aplicación. Si te hacen una pregunta fuera del tema, responde educadamente que solo estás programado para brindar información sobre AnonMusic.

Enfócate en explicar cómo funciona la carga anónima de contenido, las herramientas que ofrece la plataforma para el desarrollo musical, la comunidad anónima de artistas, medidas de seguridad para proteger la identidad del usuario, y cómo los jóvenes pueden aprovechar AnonMusic para impulsar su carrera musical.

Usa un lenguaje cercano, claro y amigable, orientado a jóvenes artistas.
Respuestas simples.
`,
        },
        { role: 'user', content: mensaje },
      ],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer', //NO PONER A API KEY EN LOS COMMIT
      'HTTP-Referer': 'http://localhost:4200',
      'X-Title': 'AnonMusic Chatbot',
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
