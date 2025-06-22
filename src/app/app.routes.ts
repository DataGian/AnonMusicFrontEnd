import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarNotificacionComponent } from './components/notificacion/insertareditar/insertareditar.component';
import { SeguidoComponent } from './components/seguido/seguido.component';
import { InsertareditarSeguidoComponent } from './components/seguido/insertareditar/insertareditar.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { InsertareditarpublicacionComponent } from './components/publicacion/insertareditarpublicacion/insertareditarpublicacion.component';

export const routes: Routes = [
    {
    path:'',redirectTo:'usuarios',pathMatch:'full'
  },
    {path:'usuarios', component: UsuarioComponent,
        children: [
            {path:'insertareditar', component: InsertareditarComponent},
            {path:'ediciones/:id',component: InsertareditarComponent},
        ]
    },
    { path: 'notificaciones', component: NotificacionComponent,
        children:[
            {path: 'insertar', component: InsertareditarNotificacionComponent},
            {path: 'ediciones/:id', component: InsertareditarNotificacionComponent} 
        ]
    },
    { path: 'seguidos', component: SeguidoComponent, 
        children:[
            {path: 'insertar', component: InsertareditarSeguidoComponent},
            {path: 'ediciones/:id', component: InsertareditarSeguidoComponent} 
        ]
    },
    { path: 'publicaciones', component: PublicacionComponent, 
        children:[
            {path: 'insertar', component: InsertareditarpublicacionComponent},
            {path: 'ediciones/:id', component: InsertareditarpublicacionComponent} 
        ]
    },
    
];
