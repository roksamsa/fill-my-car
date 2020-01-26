import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTitleTopComponent } from './tile-title-top.component';

describe('TileComponent', () => {
  let component: TileTitleTopComponent;
  let fixture: ComponentFixture<TileTitleTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileTitleTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileTitleTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
