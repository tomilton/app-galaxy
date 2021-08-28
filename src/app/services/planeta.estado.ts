
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from './store';

export interface NombreEstadoModel {
    planetaEditar: any;
    estadoEditando: any;
}

const estadoDefault: NombreEstadoModel = {
    planetaEditar: null,
    estadoEditando: false,
};

@Injectable()
export class PlanetaEstado extends Store<NombreEstadoModel> {
    constructor() {
        super(estadoDefault);
    }

    readonly planetaEditar$ = this.state$.pipe(map(el => el.planetaEditar), distinctUntilChanged());

    set planetaEditar(planetaEditar: any) { this.setState({ ...this.state, planetaEditar }); }
    get planetaEditar(): any { return this.state.planetaEditar; }

    readonly estadoEditando$ = this.state$.pipe(map(el => el.estadoEditando), distinctUntilChanged());

    set estadoEditando(estadoEditando: any) { this.setState({ ...this.state, estadoEditando }); }
    get estadoEditando(): any { return this.state.estadoEditando; }

    limpiarEstado() {
        this.setState(estadoDefault);
    }

}

