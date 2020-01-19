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
      transition(':enter', [
        group([
          query('.webpage-login__background', style({
            transform: 'scaleY(1)'
          })),
          query('.webpage-login__background', animate('600ms', style({
            transform: 'scaleY(2)'
          }))),
          query('.webpage-login', style({
            opacity: 0
          })),
          query('.webpage-login', animate('400ms 200ms', style({
            opacity: 1
          })))
        ])
      ]),
      transition(':leave', [
        group([
          query('.webpage-login__background', style({
            transform: 'scaleY(2)'
          })),
          query('.webpage-login__background', animate('600ms', style({
            transform: 'scaleY(1)'
          }))),
          query('.webpage-login', style({
            opacity: 1
          })),
          query('.webpage-login', animate('400ms', style({
            opacity: 0
          })))
        ])
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  loginRegisterOverlayVisible: boolean;

  constructor(private webpageMenuData: WebpageMenuService) { }

  ngOnInit() {
    this.webpageMenuData.currentLoginRegisterOverlayVisibilityState.subscribe(
      clickActiveState => this.loginRegisterOverlayVisible = clickActiveState
    );
  }
}
