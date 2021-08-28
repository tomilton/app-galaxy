
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from './store';

export interface NombreEstadoModel {
    personaEditar: any;
    estadoEditando: any;
}

const estadoDefault: NombreEstadoModel = {
    personaEditar: null,
    estadoEditando: false,
};

@Injectable()
export class PersonaEstado extends Store<NombreEstadoModel> {
    constructor() {
        super(estadoDefault);
    }

    readonly personaEditar$ = this.state$.pipe(map(el => el.personaEditar), distinctUntilChanged());

    set personaEditar(personaEditar: any) { this.setState({ ...this.state, personaEditar }); }
    get personaEditar(): any { return this.state.personaEditar; }

    readonly estadoEditando$ = this.state$.pipe(map(el => el.estadoEditando), distinctUntilChanged());

    set estadoEditando(estadoEditando: any) { this.setState({ ...this.state, estadoEditando }); }
    get estadoEditando(): any { return this.state.estadoEditando; }

    limpiarEstado() {
        this.setState(estadoDefault);
    }

}

