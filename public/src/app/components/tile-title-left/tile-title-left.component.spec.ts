import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTitleLeftComponent } from './tile-title-left.component';

describe('TileTitleLeftComponent', () => {
  let component: TileTitleLeftComponent;
  let fixture: ComponentFixture<TileTitleLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileTitleLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileTitleLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
