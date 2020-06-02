import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsPageComponent } from './all-trips-page.component';

describe('AllTripsPageComponent', () => {
  let component: AllTripsPageComponent;
  let fixture: ComponentFixture<AllTripsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTripsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
