import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../components/header/header.service';
import { UserMenuService } from '../../components/user-menu/user-menu.service';
import { trigger, style, animate, transition } from '@angular/animations';

export const defaultAnimationFunction = 'ease-in-out';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '250ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  animations: [
    trigger('userMenuBackDropAnimation', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
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
export class DefaultLayoutComponent implements OnInit {

  userMenuVisibility: boolean;
  darkModeActivated: boolean;

  constructor(
    private headerData: HeaderService,
    private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.userMenuVisibility = clickActiveState);
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

  clickOutsideUserMenuVisibility() {
    this.headerData.changeUserMenuVisibility(false);
  }
}
