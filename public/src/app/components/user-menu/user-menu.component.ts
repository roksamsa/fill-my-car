import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { trigger, style, animate, transition, state } from '@angular/animations';

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

  @Input() userMenuState: boolean;

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
  }

  message() {
    console.log(this.userMenuState);
  }

}
