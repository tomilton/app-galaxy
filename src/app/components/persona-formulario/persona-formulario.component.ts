import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil, tap, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GenericService } from '../../services/generic.service';
import { Catalogo } from '../../interfaces/generic.interface';
import { Genero } from '../../interfaces/genero.interface';
import { PersonaEstado } from '../../services/persona.estado';
import { ActivatedRoute, Params } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import { PersonService } from '../../services/persona.service';

@Component({
  selector: 'app-persona-formulario',
  templateUrl: './persona-formulario.component.html',
  styleUrls: ['./persona-formulario.component.scss'],
  providers: [DatePipe]
})
export class PersonaFormularioComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isNew: boolean = true;
  id: number = -1;
  listaGeneros: Genero[] = [];
  listaPlanetas: any[] = [];

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() cancel = new EventEmitter<boolean>();

  public unsubs$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private personaEstado: PersonaEstado,
    private genericService: GenericService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.isNew = true;
    this.id = -1;
    this.cargarCatalogos();
    this.listaPlanetas.push(
      {
        cantidadPersona: 0,
        clima: "CALIDO",
        contador: 0,
        diametro: 16.3,
        nombre: "TIERRA",
        periodoRotacion: "2 AÑOS",
        pkplaneta: 1
      }
    );
    this.escucharEditar();
    this.escucharRoute();
  }

  public stringTodate(f: string): Date {
    const ff1 = f.split('/');
    const fd = new Date(ff1[1] + '/' + ff1[0] + '/' + ff1[2]);
    return new Date(fd);
  }

  escucharEditar(): void {
    this.personaEstado.personaEditar$.pipe(delay(300), takeUntil(this.unsubs$), tap(
      (persona: Persona) => {
        if (persona) {
          console.log('persona: ', persona);
          this.isNew = false;
          persona.fechaNacimiento = this.datePipe.transform(this.stringTodate(persona.fechaNacimiento as string), 'yyyy-MM-dd', 'UTC');
          this.form.patchValue(persona);
        } else {
          this.isNew = true;
        }
      }
    )).subscribe();
  }

  escucharRoute(): void {
    this.activatedRoute.params.pipe(delay(400)).subscribe((params: Params) => {
      this.id = params.id;
      if (params.id && !this.pkpersonaField?.value) {
        this.isNew = false;
        /*this.personaService.getPersonaById(this.id).pipe(tap((persona: Persona) => {
          if (persona.pkpersona) {
            this.form.patchValue(persona);
          }
        })).subscribe();*/
      }
    });
  }

  compareObjects(ob1: any, ob2: any) {
    return ob1 && ob2 ? ob1.id === ob2.id : ob1 === ob2;
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
    this.personaEstado.limpiarEstado();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      pkpersona: [null],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      genero: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      edad: [null, Validators.required],
      peso: [null, [Validators.required]],
      contador: [null],
      planeta: [null],
    });
  }

  cargarCatalogos(): void {
    this.genericService.getGeneros().pipe(tap(res => this.listaGeneros = res)).subscribe();
  }

  save(): void {
    if (this.form.valid) {
      if (this.isNew) {
        console.log('Form: ', this.form.value);
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.cancel.emit(true);
  }

  nuevo() {
    this.form.reset();
    this.isNew = true;
    this.id = -1;
  }

  get pkpersonaField() { return this.form.get('pkpersona') }
  get nombreField() { return this.form.get('nombre') }
  get apellidoField() { return this.form.get('apellido') }
  get generoField() { return this.form.get('genero') }
  get fechaNacimientoField() { return this.form.get('fechaNacimiento') }
  get edadField() { return this.form.get('edad') }
  get pesoField() { return this.form.get('peso') }
  get planetaField() { return this.form.get('planeta') }
  get contadorField() { return this.form.get('contador')?.value }

}