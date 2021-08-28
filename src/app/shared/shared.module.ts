import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MensajesComponent } from './mensajes/mensajes.component';


@NgModule({
  declarations: [
    MensajesComponent
  ],
  exports: [
    MensajesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  entryComponents: [
    MensajesComponent
  ]
})
export class SharedModule { }
