import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../interfaces/respuesta.interface';
import { Persona } from '../interfaces/persona.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = `${base_url}/api/persona`;

  cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  addPersona(data: Partial<Persona>) { return this.http.post<Respuesta>(`${this.url}`, data, { headers: this.cabeceras }) }

  updatePersona(id: number, data: Partial<Persona>) { return this.http.put<Respuesta>(`${this.url}/${id}`, data) }

  listPersonas() { return this.http.get<Persona[]>(this.url) }

  getPersonaById(id: number) { return this.http.get<Persona>(`${this.url}/getPersonaPorId?id=${id}`) }

  sumarVisita(persona: Persona) { return this.http.get<Respuesta>(`${this.url}/sumarVisita?pkpersona=${persona.pkpersona}`) }

  getPersonasByPlaneta(pkplaneta: number) { return this.http.get<Persona[]>(`${this.url}/personsByPlaneta?pkplaneta=${pkplaneta}`) }

}
