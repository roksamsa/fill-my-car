import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from './webpage-menu.service';
import { FirebaseAuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-webpage-menu',
  templateUrl: './webpage-menu.component.html',
  styleUrls: ['./webpage-menu.component.scss']
})
export class WebpageMenuComponent implements OnInit {

  private loginRegisterOverlayVisibility = false;
  public isUserLoggedIn: boolean;

  constructor(private webpageMenuData: WebpageMenuService,
              public authService: FirebaseAuthService) { }

  public ngOnInit(): void {
    this.setUserLoggedInStatus();
    console.log(this.authService);
  }

  public setUserLoggedInStatus(): void {
    if (this.authService.userData.uid.length < 0) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
    }
  }

  public openLoginRegisterOverlay(): void {
    this.loginRegisterOverlayVisibility = true;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }

  public userMenuSignOut(): void {
    this.authService.SignOut();
  }
}
