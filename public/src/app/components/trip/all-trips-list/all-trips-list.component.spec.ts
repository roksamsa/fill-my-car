import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsListComponent } from './all-trips-list.component';

describe('AllTripsListComponent', () => {
  let component: AllTripsListComponent;
  let fixture: ComponentFixture<AllTripsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTripsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
