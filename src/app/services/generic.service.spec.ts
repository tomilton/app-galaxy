import { TestBed } from '@angular/core/testing';
import { GenericService } from './generic.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Generic } from '../interfaces/generic.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

describe('GenericService', () => {

    let service: GenericService;
    let httpMock: HttpTestingController;
    let url: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                GenericService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(GenericService);
        httpMock = TestBed.inject(HttpTestingController);
        url = `${base_url}/generic/search`;
    });

    afterAll(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a list and does a post method', () => {

        let ente: Generic = {
            totalItems: 2,
            data: [{
                id: 1,
                codigo: '001',
                descripcion: '',
            },
            {
                id: 2,
                codigo: '002',
                descripcion: '',
            }]
        };

        service.cargarCatalogo('ente').subscribe((data: Generic) => {
            expect(data).toEqual(ente);
        });

        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('POST');

        req.flush(ente);
    });

});