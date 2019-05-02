import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleDialogComponent } from './create-vehicle-dialog.component';

describe('CreateVehicleDialogComponent', () => {
  let component: CreateVehicleDialogComponent;
  let fixture: ComponentFixture<CreateVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
