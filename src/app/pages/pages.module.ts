import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'


// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { MaterialModule } from '../material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { AddPlanetaComponent } from './add-planeta/add-planeta.component';
import { ListPersonaComponent } from './list-persona/list-persona.component';
import { ListPlanetaComponent } from './list-planeta/list-planeta.component';
import { PersonaEstado } from '../services/persona.estado';
import { PlanetaEstado } from '../services/planeta.estado';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AddPersonaComponent,
    AddPlanetaComponent,
    ListPersonaComponent,
    ListPlanetaComponent

  ],
  exports: [
    DashboardComponent,
    PagesComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    PersonaEstado,
    PlanetaEstado
  ]
})
export class PagesModule { }
