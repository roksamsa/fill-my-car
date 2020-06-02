import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../components/webpage-menu/webpage-menu.service';

@Component({
  selector: 'app-vse-poti',
  templateUrl: './vse-poti.component.html',
  styleUrls: ['./vse-poti.component.scss']
})
export class VsePotiComponent implements OnInit {

  public loginRegisterOverlayVisible = false;

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

}
