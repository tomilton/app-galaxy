import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { ListPersonaComponent } from './list-persona/list-persona.component';
import { ListPlanetaComponent } from './list-planeta/list-planeta.component';
import { TopPlanetaComponent } from './top-planeta/top-planeta.component';
import { AddPlanetaComponent } from './add-planeta/add-planeta.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'list-persona', component: ListPersonaComponent, data: { titulo: 'Listar Personas' } },
            { path: 'list-planeta', component: ListPlanetaComponent, data: { titulo: 'Listar Planetas' } },
            { path: 'top-planeta', component: TopPlanetaComponent, data: { titulo: 'Planetas mas visitados' } },
            { path: 'add-persona', component: AddPersonaComponent, data: { titulo: 'Agregar Persona' } },
            { path: 'add-planeta', component: AddPlanetaComponent, data: { titulo: 'Agregar Planeta' } },
            { path: 'add-persona/:id', component: AddPersonaComponent, data: { titulo: 'Editar Persona' } },
            { path: 'add-planeta/:id', component: AddPlanetaComponent, data: { titulo: 'Editar Planeta' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


