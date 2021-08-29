import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../interfaces/respuesta.interface';
import { Planeta } from '../interfaces/planeta.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlanetaService {

  private url: string = `${base_url}/api/planeta`;

  cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  addPlaneta(data: Partial<Planeta>) { return this.http.post<Respuesta>(`${this.url}`, data, { headers: this.cabeceras }) }

  updatePlaneta(id: number, data: Partial<Planeta>) { return this.http.put<Respuesta>(`${this.url}/${id}`, data) }

  listPlanetas() { return this.http.get<Planeta[]>(this.url) }

  getPlanetaById(id: number) { return this.http.get<Planeta>(`${this.url}/getPlanetaPorId?id=${id}`) }

  sumarVisita(persona: Planeta) { return this.http.get<Respuesta>(`${this.url}/sumarVisita?pkplaneta=${persona.pkplaneta}`) }

  getTopPlanetas(top: number) { return this.http.get<Planeta[]>(`${this.url}/planetasMasVisitados?top=${top}`) }

}
