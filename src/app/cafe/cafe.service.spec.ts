import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CafeService } from './cafe.service';
import { Cafe } from './cafe';
import { environment } from '../../environments/environment.development';

describe('CafeService', () => {
  let service: CafeService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + '202212_MISW4104_Grupo3.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CafeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Falla si quedó alguna petición sin responder o sin esperar
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the cafes URL', () => {
    service.getCafes().subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  it('should return the list of cafes from the server', () => {
    const cafesFalsos: Cafe[] = [];
    for (let i = 1; i <= 3; i++) {
      cafesFalsos.push(
        new Cafe(
          i,
          faker.lorem.words(3),
          faker.helpers.arrayElement(['Blend', 'Café de Origen']),
          faker.location.city(),
          faker.lorem.words(3),
          faker.number.int({ min: 1000, max: 2500 }),
          faker.image.url(),
        ),
      );
    }

    let cafesRecibidos: Cafe[] = [];
    service.getCafes().subscribe((cafes) => {
      cafesRecibidos = cafes;
    });

    httpMock.expectOne(apiUrl).flush(cafesFalsos);

    expect(cafesRecibidos).toHaveSize(3);
    expect(cafesRecibidos).toEqual(cafesFalsos);
  });

  it('should return an empty list when the server has no cafes', () => {
    let cafesRecibidos: Cafe[] | undefined;
    service.getCafes().subscribe((cafes) => {
      cafesRecibidos = cafes;
    });

    httpMock.expectOne(apiUrl).flush([]);

    expect(cafesRecibidos).toEqual([]);
  });
});
