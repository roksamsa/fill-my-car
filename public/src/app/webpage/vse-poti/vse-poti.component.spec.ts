import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsePotiComponent } from './vse-poti.component';

describe('VsePotiComponent', () => {
  let component: VsePotiComponent;
  let fixture: ComponentFixture<VsePotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsePotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsePotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
