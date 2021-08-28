import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaFormularioComponent } from './persona-formulario.component';
import { FormBuilder } from '@angular/forms';
import { GenericService } from '../../services/generic.service';
import { PersonaEstado } from '../../services/persona.estado';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../../services/persona.service';
import { DatePipe } from '@angular/common';
import { PlanetaService } from '../../services/planeta.service';

describe('PersonaFormularioComponent', () => {

  let component: PersonaFormularioComponent;
  let fixture: ComponentFixture<PersonaFormularioComponent>;
  let clieneteEstado: PersonaEstado;
  let personaService: PersonService;
  let planetaService: PlanetaService;
  let genericService: GenericService;
  let activatedRoute: ActivatedRoute;
  let datePipe: DatePipe;

  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonaFormularioComponent],
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [FormBuilder, PersonService, GenericService, PersonaEstado, DatePipe]
    })
      .compileComponents();


    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    genericService = new GenericService(httpClientSpy as any);

    component = new PersonaFormularioComponent(
      new FormBuilder,
      clieneteEstado,
      genericService,
      personaService,
      planetaService,
      activatedRoute,
      datePipe
    );

  });

  xit('Debe crear un formulario con los campos especificados', () => {
    expect(component.form.contains('nombres')).toBeTruthy();
    expect(component.form.contains('direccion')).toBeTruthy();
    expect(component.form.contains('correo')).toBeTruthy();
    expect(component.form.contains('telefono')).toBeTruthy();
    expect(component.form.contains('celular')).toBeTruthy();
    expect(component.form.contains('ciudad')).toBeTruthy();
    expect(component.form.contains('fenacimiento')).toBeTruthy();
    expect(component.form.contains('genero')).toBeTruthy();
  });

  xit('El email debe ser un correo válido', () => {
    const control = component.form.get('correo');
    control?.setValue('milton.sanchez7@gmail.com');
    expect(control?.valid).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
