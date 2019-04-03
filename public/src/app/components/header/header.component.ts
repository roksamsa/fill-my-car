import { Component, OnInit, NgZone } from '@angular/core';
import { trigger, query, style, group, animate, transition } from '@angular/animations';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

export const defaultAnimationFunction = 'ease-in-out';

export const logoFadeInAnimationTiming = '150ms';
export const logoFadeOutAnimationTiming = '150ms';
export const logoAnimationDelay = '450ms';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '150ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerFadeIn', [
      transition(':enter', [
          group([
            query('.header__background', [
              style({
                height: '0'
              }),
              animate(`${logoFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
                height: '100%'
              }))
            ]),
            query('.header__menu', [
              style({
                opacity: 0
              }),
              animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
                opacity: 1
              }))
            ], { optional: true }),
            query('.header__right', [
              style({
                opacity: 0
              }),
              animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
                opacity: 1
              }))
            ]),
            query('.header__logo', [
              style({
                opacity: 0,
                transform: 'translateX(-40px)'
              }),
              animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
                opacity: 1,
                transform: 'translateX(0)'
              }))
            ])
          ])
      ]),
      transition(':leave', [
          style({
            height: '56px'
          }),
          animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
            height: '0'
          })),
          group([
            query('.header__logo', [
              style({
                opacity: 1,
                transform: 'translateX(0)'
              }),
              animate(`${logoFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
                opacity: 0,
                transform: 'translateX(-40px)'
              }))
            ])
          ])
      ]),
    ])
  ]
})

export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() { }

}
