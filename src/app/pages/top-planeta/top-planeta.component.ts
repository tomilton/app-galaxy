import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Planeta } from '../../interfaces/planeta.interface';
import { PlanetaService } from '../../services/planeta.service';
import { PlanetaEstado } from '../../services/planeta.estado';

@Component({
  selector: 'app-top-planeta',
  templateUrl: './top-planeta.component.html',
  styleUrls: ['./top-planeta.component.scss']
})
export class TopPlanetaComponent implements OnInit, OnDestroy {

  planetas: Planeta[] = [];

  private unsuscribe$ = new Subject<boolean>();

  public displayedColumns: string[] = ['pkplaneta', 'nombre', 'periodoRotacion', 'diametro', 'clima', 'terreno', 'contador'];

  constructor(
    private planetaService: PlanetaService,
    private router: Router,
    private planetaEstado: PlanetaEstado) { }


  ngOnInit(): void { this.cargarPlanetas() }

  cargarPlanetas() {
    this.planetaService.getTopPlanetas(3).pipe(
      tap((res: Planeta[]) => {
        console.log('planetas mas visitados: ', res);
        this.planetas = res;
      })
    ).subscribe();
  }

  add(): void {
    this.router.navigate(['dashboard/add-planeta']);
  }

  public update(planeta: Planeta): void {
    this.planetaService.sumarVisita(planeta)
      .pipe(
        takeUntil(this.unsuscribe$),
        tap(res => {
          this.router.navigate(['dashboard/add-planeta', planeta.pkplaneta]);
          planeta.contador = res.any;
          this.planetaEstado.planetaEditar = planeta;
          this.planetaEstado.estadoEditando = true;
        })).subscribe();
  }

  ngOnDestroy() {
    this.unsuscribe$.next(true);
    this.unsuscribe$.complete();
  }


}
