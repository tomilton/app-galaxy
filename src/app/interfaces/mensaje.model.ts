export interface MensajeModel {
  duracion?: number;
  mensaje: string;
  tipo?: TipoMensaje;
}

export enum TipoMensaje {
  INFO,
  ALERTA,
  ERROR
}

export enum DuracionMensaje {
  CORTO = 1000,
  MEDIO = 5000,
  LARGO = 20000
}
