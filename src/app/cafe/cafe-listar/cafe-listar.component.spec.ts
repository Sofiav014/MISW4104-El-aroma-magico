import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CafeListarComponent } from './cafe-listar.component';
import { Cafe } from '../cafe';

describe('CafeListarComponent', () => {
  let component: CafeListarComponent;
  let fixture: ComponentFixture<CafeListarComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [CafeListarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListarComponent);
    component = fixture.componentInstance;

    const tipos = ['Café de Origen', 'Blend', 'Café de Origen'];
    component.cafes = [];
    for (let i = 1; i <= 3; i++) {
      const cafe = new Cafe(
        i,
        faker.lorem.words(3),
        tipos[i - 1],
        faker.location.city(),
        faker.lorem.words(3),
        faker.number.int({ min: 1000, max: 2500 }),
        faker.image.url(),
      );
      component.cafes.push(cafe);
    }
    component.contarPorTipo();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with a header row', () => {
    expect(debug.queryAll(By.css('thead tr'))).toHaveSize(1);
    expect(debug.queryAll(By.css('thead th'))).toHaveSize(4);
  });

  it('should have 3 rows in the table body', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(3);
  });

  it('should have 4 rows in total (3 cafes plus the header)', () => {
    expect(debug.queryAll(By.css('table tr'))).toHaveSize(4);
  });

  it('should show the nombre, tipo and region of each cafe', () => {
    const rows = debug.queryAll(By.css('tbody tr'));
    rows.forEach((row, i) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toContain(component.cafes[i].nombre);
      expect(cells[1].nativeElement.textContent).toContain(component.cafes[i].tipo);
      expect(cells[2].nativeElement.textContent).toContain(component.cafes[i].region);
    });
  });

  it('should count 2 cafes de origen and 1 cafe blend', () => {
    expect(component.totalOrigen).toEqual(2);
    expect(component.totalBlend).toEqual(1);
  });

  it('should show the totals by tipo in two paragraphs', () => {
    const parrafos = debug.queryAll(By.css('p.total'));
    expect(parrafos).toHaveSize(2);
    expect(parrafos[0].nativeElement.textContent).toContain('Total café de origen: 2');
    expect(parrafos[1].nativeElement.textContent).toContain('Total café blend: 1');
  });

  it('should show 0 for both totals when there are no cafes', () => {
    component.cafes = [];
    component.contarPorTipo();
    fixture.detectChanges();

    const parrafos = debug.queryAll(By.css('p.total'));
    expect(parrafos[0].nativeElement.textContent).toContain('Total café de origen: 0');
    expect(parrafos[1].nativeElement.textContent).toContain('Total café blend: 0');
  });
});
