import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { HeaderService } from '../header/header.service';
import { UserMenuService } from './user-menu.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { ConstantsService } from '../../common/services/constants.service';

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
      transition(':leave', [
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
      transition(':leave', [
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
  public userMenuVisibility: boolean;
  public slideToggleChecked = false;

  public userFullName = '';
  public userName = '';

  public userEmail: any;

  constructor(
    public authService: FirebaseAuthService,
    public constant: ConstantsService,
    private userMenuDarkThemeData: UserMenuService,
    private headerData: HeaderService) {
  }

  public ngOnInit(): void {
    this.clickUserName();
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.userMenuVisibility = clickActiveState);
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.slideToggleChecked = clickActiveState);
  }

  public clickUserMenuVisibility(): void {
    this.headerData.changeUserMenuVisibility(false);
  }

  public clickUserName(): void {
    this.userEmail ?
    (this.userName = this.userFullName.replace(/ /g, '.')) :
    (this.userName = this.userEmail);
  }

  public isDarkModeActivated(): void {
    this.slideToggleChecked = !this.slideToggleChecked;
    this.userMenuDarkThemeData.changeToDarkMode(this.slideToggleChecked);
  }

  public userMenuSignOut(): void {
    this.authService.signOut();
  }
}
