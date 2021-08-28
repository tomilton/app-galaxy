import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { DuracionMensaje, MensajeModel } from '../interfaces/mensaje.model';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private readonly mensajesSubject$ = new BehaviorSubject<MensajeModel>({ mensaje: '' });
  readonly mensajes$ = this.mensajesSubject$.asObservable().pipe(skip(1));

  constructor() {
    this.mensajes$.subscribe();

  }

  mostrarMensaje(msj: MensajeModel) {
    this.mensajesSubject$.next(msj);
  }

  mostrarMensajeDeAlertas(msj: string, tipo = 1) {
    this.mostrarMensaje({
      mensaje: msj,
      duracion: DuracionMensaje.MEDIO,
      tipo
    });
  }
}
