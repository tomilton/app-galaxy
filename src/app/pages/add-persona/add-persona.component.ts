import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Respuesta } from '../../interfaces/respuesta.interface';
import { MensajesService } from '../../services/mensajes.service';
import { Persona } from '../../interfaces/persona.interface';
import { PersonService } from '../../services/persona.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers: [DatePipe]
})
export class AddPersonaComponent implements OnInit {

  constructor(private router: Router,
    private personaService: PersonService,
    private msjService: MensajesService,
    private datePipe: DatePipe) { }

  ngOnInit(): void { }

  addPersona(data: Persona) {

    data.fechaNacimiento = this.datePipe.transform(data.fechaNacimiento, 'dd/MM/yyyy');

    this.personaService.addPersona(data)
      .subscribe((rta: Respuesta) => {
        if (rta.exito) {
          this.mostrarMensajeDeAlertas('Registro Exitoso');
          this.router.navigate(['dashboard/list-persona']);
        }
      });
  }

  updatePersona(data: Persona) {
    this.personaService.updatePersona(data.pkpersona, data)
      .subscribe(rta => {
        this.mostrarMensajeDeAlertas('Actualización Axitosa');
      });
  }

  cancel(data: boolean) {
    this.router.navigate(['dashboard/list-persona']);
  }

  mostrarMensajeDeAlertas(msj: string) {
    this.msjService.mostrarMensaje({
      mensaje: msj,
      duracion: 4000,
      tipo: 1,
    });
  }

}
