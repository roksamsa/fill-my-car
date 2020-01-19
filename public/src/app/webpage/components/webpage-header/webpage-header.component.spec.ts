import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageHeaderComponent } from './webpage-header.component';

describe('WebpageHeaderComponent', () => {
  let component: WebpageHeaderComponent;
  let fixture: ComponentFixture<WebpageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
