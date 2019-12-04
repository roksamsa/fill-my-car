import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterContentComponent } from './login-register-content.component';

describe('LoginRegisterContentComponent', () => {
  let component: LoginRegisterContentComponent;
  let fixture: ComponentFixture<LoginRegisterContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
