import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListPersonaComponent } from './list-persona/list-persona.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'list-persona', component: ListPersonaComponent, data: { titulo: 'Listar Personas' } },
            { path: 'add-persona', component: AddPersonaComponent, data: { titulo: 'Agregar Persona' } },
            { path: 'add-persona/:id', component: AddPersonaComponent, data: { titulo: 'Editar Persona' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


