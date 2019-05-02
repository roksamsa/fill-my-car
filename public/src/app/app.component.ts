import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from './core/auth/auth.service';

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

  constructor(private authService: AuthService) {
  }

  _userMenuVisibility: boolean;

  userMenuState($event: boolean) {
    this._userMenuVisibility = $event;
  }

  ngOnInit(): void {
  }
}
