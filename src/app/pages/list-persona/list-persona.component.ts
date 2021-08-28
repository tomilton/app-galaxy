import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import { PersonService } from '../../services/persona.service';
import { PersonaEstado } from '../../services/persona.estado';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.scss']
})
export class ListPersonaComponent implements OnInit, OnDestroy {

  personas: Persona[] = [];

  private unsuscribe$ = new Subject<boolean>();

  public displayedColumns: string[] = ['pkpersona', 'nombre', 'apellido', 'genero', 'fechaNacimiento', 'contador', 'planeta', 'actions'];

  constructor(
    private personaService: PersonService,
    private router: Router,
    private personaEstado: PersonaEstado) { }


  ngOnInit(): void { this.cargarPersonas() }

  cargarPersonas() {
    this.personaService.listPersonas().pipe(
      tap((res: Persona[]) => {
        console.log('res: ', res);
        this.personas = res;
      })
    ).subscribe();
  }

  add(): void {
    this.router.navigate(['dashboard/add-persona']);
  }

  public update(persona: Persona): void {
    this.personaService.sumarVisita(persona)
      .pipe(
        takeUntil(this.unsuscribe$),
        tap(res => {
          this.router.navigate(['dashboard/add-persona', persona.pkpersona]);
          persona.contador = res.any;
          this.personaEstado.personaEditar = persona;
          this.personaEstado.estadoEditando = true;
        })).subscribe();
  }

  ngOnDestroy() {
    this.unsuscribe$.next(true);
    this.unsuscribe$.complete();
  }


}
