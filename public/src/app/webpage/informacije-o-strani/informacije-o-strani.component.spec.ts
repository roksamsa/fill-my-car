import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacijeOStraniComponent } from './informacije-o-strani.component';

describe('InformacijeOStraniComponent', () => {
  let component: InformacijeOStraniComponent;
  let fixture: ComponentFixture<InformacijeOStraniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacijeOStraniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacijeOStraniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
