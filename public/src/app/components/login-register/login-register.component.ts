import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebpageMenuService } from '../../webpage/components/webpage-menu/webpage-menu.service';
import { LoginService } from '../login/login.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';

export const defaultAnimationFunction = 'ease-in-out';
export const headerFadeInAnimationTiming = '400ms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  animations: [
    trigger('formChangeEnterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-30px)'
        }),
        animate(`${headerFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ])
  ]
})
export class LoginRegisterComponent implements OnInit, OnDestroy {

  private readonly appTitle = 'Napolni moj avto';
  private loginRegisterOverlayVisibility = true;
  public isLoginFormVisible = true;

  constructor(
    public loginFromVisibility: LoginService,
    private titleService: Title,
    private webpageMenuData: WebpageMenuService) { }

  ngOnInit() {
    this.loginFromVisibility.currentLoginFormVisibleState.subscribe(loginFormVisibility => this.isLoginFormVisible = loginFormVisibility);
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.appTitle);
  }

  openLoginRegisterOverlay() {
    this.loginRegisterOverlayVisibility = !this.loginRegisterOverlayVisibility;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }

  public changeFromLoginToRegister() {
    this.isLoginFormVisible = true;
    this.loginFromVisibility.changeLoginRegisterVisibility(this.isLoginFormVisible);
  }

  public changeFromRegisterToLogin() {
    this.isLoginFormVisible = false;
    this.loginFromVisibility.changeLoginRegisterVisibility(this.isLoginFormVisible);
  }
}
