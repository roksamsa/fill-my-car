import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanComponent } from './van.component';

describe('VanComponent', () => {
  let component: VanComponent;
  let fixture: ComponentFixture<VanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
