import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from './webpage-menu.service';
import { FirebaseAuthService } from '../../../core/auth/auth.service';
import { ConstantsService } from '../../../common/services/constants.service';

@Component({
  selector: 'app-webpage-menu',
  templateUrl: './webpage-menu.component.html',
  styleUrls: ['./webpage-menu.component.scss']
})
export class WebpageMenuComponent implements OnInit {

  private loginRegisterOverlayVisibility = false;
  public otherContentVisible = false;
  public preloadingSpinnerVisibility = true;
  public userName = '';

  constructor(private webpageMenuData: WebpageMenuService,
              public constant: ConstantsService,
              public authService: FirebaseAuthService) {
    console.log(this.userName);
    this.preloadingSpinnerVisibility = true;
    this.preloadingSpinnerShow();
  }

  ngOnInit() {
    this.userName = this.authService.onlyName;
  }

  public openLoginRegisterOverlay(): void {
    this.loginRegisterOverlayVisibility = true;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }

  public userMenuSignOut(): void {
    this.authService.signOut();
  }

  private preloadingSpinnerShow() {
    const that = this;
    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 1500);
  }
}
