import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadingSpinnerComponent } from './preloading-spinner.component';

describe('PreloadingSpinnerComponent', () => {
  let component: PreloadingSpinnerComponent;
  let fixture: ComponentFixture<PreloadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
