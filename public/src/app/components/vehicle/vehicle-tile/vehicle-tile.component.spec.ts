import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTileComponent } from './vehicle-tile.component';

describe('VehicleTileComponent', () => {
  let component: VehicleTileComponent;
  let fixture: ComponentFixture<VehicleTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
