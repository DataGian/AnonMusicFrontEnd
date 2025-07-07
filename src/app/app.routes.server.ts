import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },

  // Rutas con parámetros dinámicos -> server
  {
    path: 'usuarios/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'musicas/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'comentarios/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'reacciones/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'asesoramientos/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'roles/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'recomendaciones/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'publicaciones/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'seguidores/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'seguidos/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'playlistsxusuario/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'notificaciones/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'notificacionesxusuario/ediciones/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'musicas',
    renderMode: RenderMode.Server
  },
  {
    path: 'musicas/insertareditar',
    renderMode: RenderMode.Server
  },
  {
    path: 'asesoramientos',
    renderMode: RenderMode.Server
  },
  {
    path: 'asesoramientos/insertareditar',
    renderMode: RenderMode.Server
  },
  {
    path: 'recomendaciones',
    renderMode: RenderMode.Server
  },
  {
    path: 'recomendaciones/insertareditar',
    renderMode: RenderMode.Server
  },
  {
    path: 'roles',
    renderMode: RenderMode.Server
  },
  {
    path: 'roles/insertareditar',
    renderMode: RenderMode.Server
  },

  // Fallback para evitar errores en otras rutas no listadas
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
