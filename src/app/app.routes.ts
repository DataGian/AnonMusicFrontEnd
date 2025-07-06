import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { Component } from '@angular/core';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';

export const routes: Routes = [
    {path:'usuarios', component: UsuarioComponent,
        children: [
            {path:'insertareditar', component: InsertareditarComponent},
            {path:'ediciones/:id',component: InsertareditarComponent},
        ]
    },
    { path: 'notificaciones', component: NotificacionComponent }
];
