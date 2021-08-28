import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil, tap, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from '../../services/generic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Planeta, Persona } from '../../interfaces/persona.interface';
import { PlanetaEstado } from '../../services/planeta.estado';
import { PersonService } from '../../services/persona.service';

@Component({
  selector: 'app-planeta-formulario',
  templateUrl: './planeta-formulario.component.html',
  styleUrls: ['./planeta-formulario.component.scss']
})
export class PlanetaFormularioComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isNew: boolean = true;
  id: number = -1;

  listaPersonas: Persona[] = [];

  public displayedColumns: string[] = ['pkpersona', 'nombre', 'apellido', 'genero', 'fechaNacimiento', 'contador'];

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() cancel = new EventEmitter<boolean>();

  public unsubs$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private planetaEstado: PlanetaEstado,
    private genericService: GenericService,
    private personaService: PersonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.isNew = true;
    this.id = -1;
    this.escucharEditar();
    this.escucharRoute();
  }

  escucharEditar(): void {
    this.planetaEstado.planetaEditar$.pipe(delay(300), takeUntil(this.unsubs$), tap(
      (planeta: Planeta) => {
        if (planeta) {
          console.log('planeta seleccionado: ', planeta);
          this.isNew = false;
          this.form.patchValue(planeta);
        } else {
          this.isNew = true;
        }
      }
    )).subscribe();
  }

  escucharRoute(): void {
    this.activatedRoute.params.pipe(delay(400)).subscribe((params: Params) => {
      console.log('params: ', params);
      this.id = params.id;
      this.listaPersonas = [];

      if (params.id && !this.pkplanetaField?.value) {
        this.isNew = false;
      }

      if (this.id) {
        this.personaService.getPersonasByPlaneta(this.id).pipe(tap(res => {
          this.listaPersonas = res;
        })).subscribe();
      }



    });
  }

  compareObjects(ob1: any, ob2: any) {
    return ob1 && ob2 ? ob1.id === ob2.id : ob1 === ob2;
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
    this.planetaEstado.limpiarEstado();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      pkplaneta: [null],
      nombre: [null, Validators.required],
      periodoRotacion: [null, Validators.required],
      diametro: [null, Validators.required],
      clima: [null, Validators.required],
      terreno: [null, [Validators.required]],
      contador: [null]
    });
  }


  save(): void {
    if (this.form.valid) {
      if (this.isNew) {
        console.log('Form planeta: ', this.form.value);
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

  get pkplanetaField() { return this.form.get('pkplaneta') }
  get nombreField() { return this.form.get('nombre') }
  get periodoRotacionField() { return this.form.get('periodoRotacion') }
  get diametroField() { return this.form.get('diametro') }
  get climaField() { return this.form.get('clima') }
  get terrenoField() { return this.form.get('terreno') }
  get contadorField() { return this.form.get('contador')?.value }

}