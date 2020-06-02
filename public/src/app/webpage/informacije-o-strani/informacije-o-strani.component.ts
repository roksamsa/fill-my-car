import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../components/webpage-menu/webpage-menu.service';

@Component({
  selector: 'app-informacije-o-strani',
  templateUrl: './informacije-o-strani.component.html',
  styleUrls: ['./informacije-o-strani.component.scss']
})
export class InformacijeOStraniComponent implements OnInit {

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
