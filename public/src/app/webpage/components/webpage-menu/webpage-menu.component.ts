import { Component } from '@angular/core';
import { WebpageMenuService } from './webpage-menu.service';
import { FirebaseAuthService } from '../../../core/auth/auth.service';
import { ConstantsService } from '../../../common/services/constants.service';

@Component({
  selector: 'app-webpage-menu',
  templateUrl: './webpage-menu.component.html',
  styleUrls: ['./webpage-menu.component.scss']
})
export class WebpageMenuComponent {

  private loginRegisterOverlayVisibility = false;
  public otherContentVisible = false;

  constructor(private webpageMenuData: WebpageMenuService,
              public constant: ConstantsService,
              public authService: FirebaseAuthService) {
  }

  public openLoginRegisterOverlay(): void {
    this.loginRegisterOverlayVisibility = true;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }

  public userMenuSignOut(): void {
    this.authService.signOut();
  }
}
