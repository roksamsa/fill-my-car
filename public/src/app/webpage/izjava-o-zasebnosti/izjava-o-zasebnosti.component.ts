import { Component, OnInit } from '@angular/core';
import { WebpageMenuService } from '../components/webpage-menu/webpage-menu.service';

@Component({
  selector: 'app-izjava-o-zasebnosti',
  templateUrl: './izjava-o-zasebnosti.component.html',
  styleUrls: ['./izjava-o-zasebnosti.component.scss']
})
export class IzjavaOZasebnostiComponent implements OnInit {

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
