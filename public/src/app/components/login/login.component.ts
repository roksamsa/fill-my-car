import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { LoginService } from './login.service';
import { Title } from '@angular/platform-browser';

export const defaultAnimationFunction = 'ease-in-out';
export const headerFadeInAnimationTiming = '400ms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('formEnterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30px)'
        }),
        animate(`${headerFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  tileTitle = 'Prijava / Registracija';
  loginForm: FormGroup;
  isLoginFormVisible = true;
  public isRegisterNotificationVisible = false;

  constructor(
    public authService: FirebaseAuthService,
    public loginFromVisibility: LoginService,
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.tileTitle);
    this.loginFromVisibility.currentLoginFormVisibleState.subscribe(loginFormVisibility => this.isLoginFormVisible = loginFormVisibility);
  }

  public changeFromLoginToRegister() {
    this.isLoginFormVisible = true;
    this.loginFromVisibility.changeLoginRegisterVisibility(this.isLoginFormVisible);
  }

  public changeFromRegisterToLogin() {
    this.isLoginFormVisible = false;
    this.loginFromVisibility.changeLoginRegisterVisibility(this.isLoginFormVisible);
  }

  public registerWithEmail(email: string, password: string): void {
    const that = this;

    this.authService.EmailSignUp(email, password).then(() => {
      this.isRegisterNotificationVisible = true;
      setTimeout(function() {
        that.isRegisterNotificationVisible = false;
      }, 5000);
    }).catch((error) => {
      window.alert(error.message);
    });
  };
}
