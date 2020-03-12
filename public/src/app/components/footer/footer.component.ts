import { Component, OnInit, Input } from '@angular/core';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footerStyle = 'default';
  currentYear = new Date().getFullYear();
  darkModeActivated: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

}
