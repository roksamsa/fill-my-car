import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from './webpage-menu.service';

@Component({
  selector: 'app-webpage-menu',
  templateUrl: './webpage-menu.component.html',
  styleUrls: ['./webpage-menu.component.scss']
})
export class WebpageMenuComponent implements OnInit {

  private loginRegisterOverlayVisibility = false;

  constructor(private webpageMenuData: WebpageMenuService) { }

  ngOnInit() {
  }

  openLoginRegisterOverlay() {
    this.loginRegisterOverlayVisibility = !this.loginRegisterOverlayVisibility;
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }

}
