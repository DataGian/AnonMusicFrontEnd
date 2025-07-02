import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarNotificacionComponent } from './components/notificacion/insertareditar/insertareditar.component';
import { SeguidoComponent } from './components/seguido/seguido.component';
import { InsertareditarSeguidoComponent } from './components/seguido/insertareditar/insertareditar.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { InsertareditarpublicacionComponent } from './components/publicacion/insertareditarpublicacion/insertareditarpublicacion.component';
import { PlaylistxusuarioComponent } from './components/playlistxusuario/playlistxusuario.component';
import { InsertareditarplaylistxusuarioComponent } from './components/playlistxusuario/insertareditarplaylistxusuario/insertareditarplaylistxusuario.component';
import { SeguidoresComponent } from './components/seguidores/seguidores.component';
import { InsertareditarseguidoresComponent } from './components/seguidores/insertareditarseguidores/insertareditarseguidores.component';
import { NotificacionesxusuarioComponent } from './components/notificacionesxusuario/notificacionesxusuario.component';
import { InsertareditarnotificacionxusuarioComponent } from './components/notificacionesxusuario/insertareditarnotificacionxusuario/insertareditarnotificacionxusuario.component';
import { InsertareditarcomentarioComponent } from './components/comentario/insertareditarcomentario/insertareditarcomentario.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { LandingComponentng } from './components/landing/landing.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'homes',
    component: LandingComponentng,
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarComponent },
      { path: 'ediciones/:id', component: InsertareditarComponent },
    ],
    canActivate: [seguridadGuard ],
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children: [
      { path: 'insertar', component: InsertareditarNotificacionComponent },
      { path: 'ediciones/:id', component: InsertareditarNotificacionComponent },
    ],
    canActivate: [seguridadGuard ],
  },
  {
    path: 'notificacionesxusuario',
    component: NotificacionesxusuarioComponent,
    children: [
      {
        path: 'insertar',
        component: InsertareditarnotificacionxusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarnotificacionxusuarioComponent,
      },
    ],
    canActivate: [seguridadGuard ],
  },
  {
    path: 'seguidos',
    component: SeguidoComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarSeguidoComponent },
      { path: 'ediciones/:id', component: InsertareditarSeguidoComponent },
    ],canActivate: [seguridadGuard ],
  },
  {
    path: 'publicaciones',
    component: PublicacionComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarpublicacionComponent },
      { path: 'ediciones/:id', component: InsertareditarpublicacionComponent },
    ],canActivate: [seguridadGuard ],
  },
  {
    path: 'playlistsxusuario',
    component: PlaylistxusuarioComponent,
    children: [
      {
        path: 'insertareditar',
        component: InsertareditarplaylistxusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarplaylistxusuarioComponent,
      },
    ],canActivate: [seguridadGuard ],
  },
  {
    path: 'seguidores',
    component: SeguidoresComponent,
    children: [
      { path: 'insertar', component: InsertareditarseguidoresComponent },
      { path: 'ediciones/:id', component: InsertareditarseguidoresComponent },
    ],canActivate: [seguridadGuard ],
  },
  {
    path: 'comentarios',
    component: ComentarioComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarcomentarioComponent },
      { path: 'ediciones/:id', component: InsertareditarcomentarioComponent },
    ],canActivate: [seguridadGuard ],
  },
];
