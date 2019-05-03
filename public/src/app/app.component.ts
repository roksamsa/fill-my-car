import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from './core/auth/auth.service';
import { HeaderService } from '../app/components/header/header.service';

export const defaultAnimationFunction = 'ease-in-out';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '250ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements OnInit {

  title = 'Napolni moj avto';
  userMenuVisibility: boolean;

  constructor(
    private authService: AuthService,
    private headerData: HeaderService) {
  }

  ngOnInit() {
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.userMenuVisibility = clickActiveState);
  }

  clickOutsideUserMenuVisibility() {
    this.userMenuVisibility = false;
    this.headerData.changeUserMenuVisibility(this.userMenuVisibility);
    console.log(this.userMenuVisibility);
  }
}
