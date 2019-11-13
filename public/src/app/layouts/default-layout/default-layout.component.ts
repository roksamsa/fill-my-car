import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../components/header/header.service';
import { UserMenuService } from '../../components/user-menu/user-menu.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  userMenuVisibility: boolean;
  darkModeActivated: boolean;

  constructor(
    private headerData: HeaderService,
    private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.userMenuVisibility = clickActiveState);
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

}
