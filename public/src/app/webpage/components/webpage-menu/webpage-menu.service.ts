import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WebpageMenuService {

  private loginRegisterOverlayVisibility = new BehaviorSubject(false);
  currentLoginRegisterOverlayVisibilityState = this.loginRegisterOverlayVisibility.asObservable();

  constructor() { }

  openLoginRegisterOverlay(loginRegisterOverlayVisibilityState: boolean) {
    this.loginRegisterOverlayVisibility.next(loginRegisterOverlayVisibilityState);
  }
}
