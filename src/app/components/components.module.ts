import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { PersonaFormularioComponent } from './persona-formulario/persona-formulario.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PersonaFormularioComponent,
    ImagenPipe,
  ],
  exports: [
    PersonaFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule

  ]
})
export class ComponentsModule { }
