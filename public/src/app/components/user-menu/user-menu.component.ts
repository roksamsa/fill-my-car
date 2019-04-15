import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { trigger, query, style, group, animate, transition } from '@angular/animations';

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
          transform: 'scaleY(0)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          transform: 'scaleY(1)'
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'scaleY(1)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
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

  constructor(
    public authService: AuthService) { }

  ngOnInit() {
  }

}
