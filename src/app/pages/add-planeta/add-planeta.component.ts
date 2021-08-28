import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Respuesta } from '../../interfaces/respuesta.interface';
import { MensajesService } from '../../services/mensajes.service';
import { Planeta } from '../../interfaces/persona.interface';
import { PlanetaService } from '../../services/planeta.service';

@Component({
  selector: 'app-add-planeta',
  templateUrl: './add-planeta.component.html',
  styleUrls: ['./add-planeta.component.scss'],
  providers: [DatePipe]
})
export class AddPlanetaComponent implements OnInit {

  constructor(private router: Router,
    private planetaService: PlanetaService,
    private msjService: MensajesService) { }

  ngOnInit(): void { }

  addPlaneta(data: Planeta) {

    this.planetaService.addPlaneta(data)
      .subscribe((rta: Respuesta) => {
        if (rta.exito) {
          this.mostrarMensajeDeAlertas('Registro Exitoso');
          this.router.navigate(['dashboard/list-planeta']);
        }
      });
  }

  updatePlaneta(data: Planeta) {
    this.planetaService.updatePlaneta(data.pkplaneta, data)
      .subscribe(rta => {
        this.mostrarMensajeDeAlertas('Actualización Axitosa');
      });
  }

  cancel(data: boolean) {
    this.router.navigate(['dashboard/list-planeta']);
  }

  mostrarMensajeDeAlertas(msj: string) {
    this.msjService.mostrarMensaje({
      mensaje: msj,
      duracion: 4000,
      tipo: 1,
    });
  }

}
