import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../components/webpage-menu/webpage-menu.service';
import { trigger, query, style, group, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('loginRegisterOverlayAnimation', [
      state('in', style({
        opacity: 1,
        top: 0
      })),
      transition(':enter', [
        style({
          opacity: 1,
          top: 0
        }),
        group([
          style({
            opacity: 0,
            top: '100%'
          }),
          animate('300ms', style({
            opacity: '1',
            top: '0'
          })),
          query('.webpage-login', style({
            opacity: 0,
            transform: 'translateY(60px)'
          }), { optional: true }),
          query('.webpage-login', animate('300ms 500ms ease-in-out', style({
            opacity: 1,
            transform: 'translateY(0)'
          })), { optional: true }),
          query('.webpage-login__footer', style({
            opacity: 0,
            transform: 'translateY(60px)'
          }), { optional: true }),
          query('.webpage-login__footer', animate('300ms 700ms ease-in-out', style({
            opacity: 1,
            transform: 'translateY(0)'
          })), { optional: true }),
          query('.webpage-login__headline', style({
            opacity: 0
          }), { optional: true }),
          query('.webpage-login__headline', animate('300ms 700ms ease-in-out', style({
            opacity: 1
          })), { optional: true })
        ])
      ]),
      transition(':leave', [
        group([
          style({
            opacity: 1,
            top: 0
          }),
          animate('200ms 400ms', style({
            opacity: 0,
            top: '100%'
          })),
          query('.webpage-login', style({
            opacity: 1,
            transform: 'translateY(0)'
          }), { optional: true }),
          query('.webpage-login', animate('200ms ease-in-out', style({
            opacity: 0,
            transform: 'translateY(60px)'
          })), { optional: true }),
          query('.webpage-login__footer', style({
            opacity: 1,
            transform: 'translateY(0)'
          }), { optional: true }),
          query('.webpage-login__footer', animate('200ms ease-in-out', style({
            opacity: 0,
            transform: 'translateY(60px)'
          })), { optional: true }),
          query('.webpage-login__headline', style({
            opacity: 1
          }), { optional: true }),
          query('.webpage-login__headline', animate('200ms ease-in-out', style({
            opacity: 0
          })), { optional: true })
        ])
      ])
    ]),
    trigger('homeVanAnimation', [
      transition(':enter', [
        group([
          style({
            opacity: '0',
            transform: 'translateX(-70%)'
          }),
          animate('500ms 500ms', style({
            opacity: '1',
            transform: 'translateX(0)'
          }))
        ])
      ]),
      transition(':leave', [
        group([
          style({
            opacity: '1',
            transform: 'translateX(0)'
          }),
          animate('400ms', style({
            opacity: '0',
            transform: 'translateX(-50%)'
          }))
        ])
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  public loginRegisterOverlayVisible = false;
  public vanAnimationState = false;

  constructor(private webpageMenuData: WebpageMenuService) { }

  public ngOnInit(): void {
    this.webpageMenuData.currentLoginRegisterOverlayVisibilityState.subscribe(
      clickActiveState => this.loginRegisterOverlayVisible = clickActiveState
    );
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisible);
  }

  public openLoginOverlay(): void {
    this.webpageMenuData.openLoginRegisterOverlay(true);
  }

  public homeVanAnimationDoneEvent(event: AnimationEvent): void {
    this.vanAnimationState = true;
  }
}
