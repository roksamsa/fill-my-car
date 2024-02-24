import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripListComponent } from './my-trip-list.component';

describe('MyTripListComponent', () => {
  let component: MyTripListComponent;
  let fixture: ComponentFixture<MyTripListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTripListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
