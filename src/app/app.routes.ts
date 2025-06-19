import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';
import { InsertareditarNotificacionComponent } from './components/notificacion/insertareditar/insertareditar.component';

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
    }
];
