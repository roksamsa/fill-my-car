import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StranNiNajdenaComponent } from './stran-ni-najdena.component';

describe('StranNiNajdenaComponent', () => {
  let component: StranNiNajdenaComponent;
  let fixture: ComponentFixture<StranNiNajdenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StranNiNajdenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StranNiNajdenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
