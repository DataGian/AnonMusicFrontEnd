import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  mensajeUsuario = '';
  mensajes: { contenido: string; tipo: 'usuario' | 'bot' }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  enviarMensaje(): void {
    const mensaje = this.mensajeUsuario.trim();
    if (!mensaje) return;

    this.mensajes.push({ contenido: mensaje, tipo: 'usuario' });
    this.mensajeUsuario = '';

    this.chatbotService.sendMessage(mensaje).subscribe(
      (response) => {
        const respuesta = response.choices?.[0]?.message?.content || 'Sin respuesta del bot.';
        this.mensajes.push({ contenido: respuesta, tipo: 'bot' });
      },
      () => {
        this.mensajes.push({ contenido: 'Error al contactar con el bot.', tipo: 'bot' });
      }
    );
  }
}
