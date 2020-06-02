import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSeatsComponent } from './vehicle-seats.component';

describe('VehicleSeatsComponent', () => {
  let component: VehicleSeatsComponent;
  let fixture: ComponentFixture<VehicleSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
