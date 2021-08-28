import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MensajesService } from '../../services/mensajes.service';
import { MensajeModel, TipoMensaje } from '../../interfaces/mensaje.model';

@Component({
  selector: 'app-mensajes',
  template: '',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<boolean>();

  @Input() configuracion: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  };

  constructor(private snack: MatSnackBar, private ms: MensajesService) { }

  ngOnInit() {
    this.ms.mensajes$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (msj: MensajeModel) => {
        this.mostrarMensaje(msj);
      }
    });
  }

  mostrarMensaje(msj: MensajeModel) {
    // if (msj.duracion >= 0) {
      this.configuracion.duration = msj.duracion;
   // }
    if (msj.tipo === TipoMensaje.ALERTA) {
      this.configuracion.panelClass = ['mensaje-warn'];
    } else if (msj.tipo === TipoMensaje.ERROR) {
      this.configuracion.panelClass = ['mensaje-error'];
    } else {
      this.configuracion.panelClass = ['portento-snackbar'];
    }
    this.snack.open(msj.mensaje, 'Cerrar', this.configuracion);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
