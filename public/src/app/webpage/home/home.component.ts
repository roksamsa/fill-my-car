import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../components/webpage-menu/webpage-menu.service';
import { trigger, query, style, group, animate, transition, state } from '@angular/animations';
import { ScaleControl } from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('loginRegisterOverlayAnimation', [
      state('in', style({
        opacity: '1',
        height: '100%'
      })),
      transition(':enter', [
        group([
          style({
            opacity: '0',
            height: '50%'
          }),
          animate('300ms', style({
            opacity: '1',
            height: '100%'
          })),
          query('.webpage-login', style({
            opacity: 0
          })),
          query('.webpage-login', animate('300ms 300ms', style({
            opacity: 1
          })))
        ])
      ]),
      transition(':leave', [
        group([
          style({
            opacity: '1',
            height: '100%'
          }),
          animate('200ms', style({
            opacity: '0',
            height: '50%'
          })),
          query('.webpage-login', style({
            opacity: 1
          })),
          query('.webpage-login', animate('200ms', style({
            opacity: 0
          })))
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

  loginRegisterOverlayVisible: boolean;
  vanAnimationState = false;

  constructor(private webpageMenuData: WebpageMenuService) { }

  ngOnInit() {
    this.webpageMenuData.currentLoginRegisterOverlayVisibilityState.subscribe(
      clickActiveState => this.loginRegisterOverlayVisible = clickActiveState
    );
  }

  homeVanAnimationDoneEvent(event: AnimationEvent) {
    this.vanAnimationState = true;
  }
}
