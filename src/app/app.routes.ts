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
import { ReaccionComponent } from './components/reaccion/reaccion.component';
import { InsertareditarreaccionComponent } from './components/reaccion/insertareditarreaccion/insertareditarreaccion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Reporte5publicacionesconmascomentariosComponent } from './components/reportes/reporte5publicacionesconmascomentarios/reporte5publicacionesconmascomentarios.component';
import { MusicaComponent } from './components/musica/musica.component';
import { InsertareditarmusicaComponent } from './components/musica/insertareditarmusica/insertareditarmusica.component';
import { RecomendacionComponent } from './components/recomendacion/recomendacion.component';
import { InsertareditarrecomendacionComponent } from './components/recomendacion/insertareditarrecomendacion/insertareditarrecomendacion.component';
import { RolesComponent } from './components/roles/roles.component';
import { InsertareditarrolesComponent } from './components/roles/insertareditarroles/insertareditarroles.component';
import { ReportenotificacionesnovistasportipoComponent } from './components/reportes/reportenotificacionesnovistasportipo/reportenotificacionesnovistasportipo.component';
import { ReporteusuariosconmasmusicaanonimaComponent } from './components/reportes/reporteusuariosconmasmusicaanonima/reporteusuariosconmasmusicaanonima.component';
import { ReporteusuariosconmasnostificacionesnoleidasComponent } from './components/reportes/reporteusuariosconmasnostificacionesnoleidas/reporteusuariosconmasnostificacionesnoleidas.component';
import { AsesoramientoComponent } from './components/asesoramiento/asesoramiento.component';
import { InsertareditarasesoramientoComponent } from './components/asesoramiento/insertareditarasesoramiento/insertareditarasesoramiento.component';
import { ReporteusuarioconplaylistComponent } from './components/reportes/reporteusuarioconplaylist/reporteusuarioconplaylist.component';
import { ReportepublicacionesenrangodefechasComponent } from './components/reportes/reportepublicacionesenrangodefechas/reportepublicacionesenrangodefechas.component';
import { ReporteusuariosconmasreaccionesnegativasComponent } from './components/reportes/reporteusuariosconmasreaccionesnegativas/reporteusuariosconmasreaccionesnegativas.component';
import { ReporteusuariosconmasseguidoresComponent } from './components/reportes/reporteusuariosconmasseguidores/reporteusuariosconmasseguidores.component';

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
    path: 'homes',
    component: LandingComponentng,
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarComponent },
      { path: 'ediciones/:id', component: InsertareditarComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children: [
      { path: 'insertar', component: InsertareditarNotificacionComponent },
      { path: 'ediciones/:id', component: InsertareditarNotificacionComponent,data: { renderMode: 'server' } },
      
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
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
        data: { renderMode: 'server' }
      },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
  },
  {
    path: 'seguidos',
    component: SeguidoComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarSeguidoComponent },
      { path: 'ediciones/:id', component: InsertareditarSeguidoComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
  },
  {
    path: 'publicaciones',
    component: PublicacionComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarpublicacionComponent },
      { path: 'ediciones/:id', component: InsertareditarpublicacionComponent,
        data: { renderMode: 'server' }
       },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
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
        data: { renderMode: 'server' }
      },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' },
  },
  {
    path: 'seguidores',
    component: SeguidoresComponent,
    children: [
      { path: 'insertar', component: InsertareditarseguidoresComponent },
      { path: 'ediciones/:id', component: InsertareditarseguidoresComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' },
  },
  {
    path: 'comentarios',
    component: ComentarioComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarcomentarioComponent },
      { path: 'ediciones/:id', component: InsertareditarcomentarioComponent,data: { renderMode: 'server' } },
      
    ],
    data: { renderMode: 'server' },
    canActivate: [seguridadGuard],
  },
  {
    path: 'reacciones',
    component: ReaccionComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarreaccionComponent },
      { path: 'ediciones/:id', component: InsertareditarreaccionComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'publicacionesconmascomentarios',
        component: Reporte5publicacionesconmascomentariosComponent,
      },
      {
        path: 'notificacionesnovistas',
        component: ReportenotificacionesnovistasportipoComponent,
      },
      {
        path: 'usuariosmasmusicaanonima',
        component: ReporteusuariosconmasmusicaanonimaComponent,
      },
      {
        path: 'usuariosmasnotificacionesnovistas',
        component: ReporteusuariosconmasnostificacionesnoleidasComponent,
      },
      {
        path: 'usuarioconplaylist',
        component: ReporteusuarioconplaylistComponent,
      },
      {
        path:'publicacionesenrangodefecha',
        component: ReportepublicacionesenrangodefechasComponent,
      },
      {
        path: 'usuariosconmasreaccionesnegativas',
        component: ReporteusuariosconmasreaccionesnegativasComponent,
      },
      {
        path: 'usuariosconmasseguidores',
        component: ReporteusuariosconmasseguidoresComponent,
      },
    ],
  },
  {
    path: 'musicas',
    component: MusicaComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarmusicaComponent },
      { path: 'ediciones/:id', component: InsertareditarmusicaComponent,data: { renderMode: 'server' } },
    ],
    data: { renderMode: 'server' }
  },
  {
    path: 'recomendaciones',
    component: RecomendacionComponent,
    children: [
      {
        path: 'insertareditar',
        component: InsertareditarrecomendacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarrecomendacionComponent,
        data: { renderMode: 'server' }
      },
    ],
    data: { renderMode: 'server' }
  },
  {
    path: 'roles',
    component: RolesComponent,
    children: [
      { path: 'insertareditar', component: InsertareditarrolesComponent },
      { path: 'ediciones/:id', component: InsertareditarrolesComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    data: { renderMode: 'server' }
  },
  {
    path: 'asesoramientos',
    component: AsesoramientoComponent,
    data: { renderMode: 'server' },
    children: [
      { path: 'insertareditar', component: InsertareditarasesoramientoComponent },
      { path: 'ediciones/:id', component: InsertareditarasesoramientoComponent,data: { renderMode: 'server' } },
    ],
    canActivate: [seguridadGuard],
    
  },
];
