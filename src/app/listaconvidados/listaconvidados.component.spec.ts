import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaconvidadosComponent } from './listaconvidados.component';

describe('ListaconvidadosComponent', () => {
  let component: ListaconvidadosComponent;
  let fixture: ComponentFixture<ListaconvidadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaconvidadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaconvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
