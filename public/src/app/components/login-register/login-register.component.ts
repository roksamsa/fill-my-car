import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../../webpage/components/webpage-menu/webpage-menu.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  private loginRegisterOverlayVisibility = true;

  constructor(private webpageMenuData: WebpageMenuService) { }

  ngOnInit() {
  }

  openLoginRegisterOverlay() {
    this.loginRegisterOverlayVisibility = !this.loginRegisterOverlayVisibility;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }
}
