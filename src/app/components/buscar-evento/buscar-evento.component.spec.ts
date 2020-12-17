import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEventoComponent } from './buscar-evento.component';

describe('BuscarEventoComponent', () => {
  let component: BuscarEventoComponent;
  let fixture: ComponentFixture<BuscarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
