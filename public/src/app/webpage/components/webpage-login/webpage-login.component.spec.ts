import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageLoginComponent } from './webpage-login.component';

describe('LoginComponent', () => {
  let component: WebpageLoginComponent;
  let fixture: ComponentFixture<WebpageLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
