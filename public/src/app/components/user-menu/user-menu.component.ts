import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { HeaderService } from '../header/header.service';
import { UserMenuService } from './user-menu.service';
import { trigger, style, animate, transition } from '@angular/animations';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '150ms';
export const defaultAnimationFunction = 'ease-in-out';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  animations: [
    trigger('userMenuBackgroundFadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scaleY(0)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1,
          transform: 'scaleY(1)'
        }))
      ]),
      transition('true => false', [
        style({
          opacity: 1,
          transform: 'scaleY(1)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 0,
          transform: 'scaleY(0)'
        }))
      ])
    ]),
    trigger('userMenuContentFadeIn', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(`${headerFadeOutAnimationTiming} ${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1
        }))
      ]),
      transition('true => false', [
        style({
          opacity: 1
        }),
        animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 0
        }))
      ])
    ])
  ]
})

export class UserMenuComponent implements OnInit {
  userMenuVisibility: boolean;
  slideToggleChecked = false;
  userFullName = '';
  userEmail = '';
  userName = '';

  constructor(
    public authService: FirebaseAuthService,
    private userMenuDarkThemeData: UserMenuService,
    private headerData: HeaderService) {
    this.userFullName = authService.userData.displayName;
    this.userEmail = authService.userData.email;
  }

  ngOnInit() {
    this.clickUserName();
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.userMenuVisibility = clickActiveState);
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.slideToggleChecked = clickActiveState);
  }

  clickUserMenuVisibility() {
    this.headerData.changeUserMenuVisibility(false);
  }

  clickUserName() {
    if (this.userFullName) {
      this.userName = this.userFullName.replace(/ /g, '.');
    } else {
      this.userName = this.userEmail;
    }
  }

  isDarkModeActivated() {
    this.slideToggleChecked = !this.slideToggleChecked;
    this.userMenuDarkThemeData.changeToDarkMode(this.slideToggleChecked);
  }

  userMenuSignOut() {
    this.authService.SignOut();
    this.headerData.changeUserMenuVisibility(false);
  }
}
