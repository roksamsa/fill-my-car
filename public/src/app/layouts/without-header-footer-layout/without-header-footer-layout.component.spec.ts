import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutHeaderFooterLayoutComponent } from './without-header-footer-layout.component';

describe('WithoutHeaderFooterLayoutComponent', () => {
  let component: WithoutHeaderFooterLayoutComponent;
  let fixture: ComponentFixture<WithoutHeaderFooterLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutHeaderFooterLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutHeaderFooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
