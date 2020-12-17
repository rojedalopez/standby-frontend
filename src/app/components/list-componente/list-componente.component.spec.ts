import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponenteComponent } from './list-componente.component';

describe('ListComponenteComponent', () => {
  let component: ListComponenteComponent;
  let fixture: ComponentFixture<ListComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
