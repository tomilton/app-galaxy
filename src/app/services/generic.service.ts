import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Generic } from '../interfaces/generic.interface';
import { Genero } from '../interfaces/genero.interface';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private url: string = `${base_url}/generic/search`;

  private generos: Genero[] = [
    { id: "M", descripcion: 'MASCULINO' },
    { id: "F", descripcion: 'FEMENINO' },
  ];

  constructor(private http: HttpClient) { }

  cargarCatalogo(entityName: string) { return this.http.post<Generic>(this.url, { entityName: entityName }) }

  getGeneros() { return of<Genero[]>(this.generos) }

}
