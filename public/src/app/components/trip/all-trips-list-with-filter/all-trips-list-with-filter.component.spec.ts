import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsListWithFilterComponent } from './all-trips-list-with-filter.component';

describe('AllTripsListWithFilterComponent', () => {
  let component: AllTripsListWithFilterComponent;
  let fixture: ComponentFixture<AllTripsListWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTripsListWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTripsListWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
