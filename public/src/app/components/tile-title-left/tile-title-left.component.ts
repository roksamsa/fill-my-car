import { Component, OnInit } from '@angular/core';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-tile-title-left',
  templateUrl: './tile-title-left.component.html',
  styleUrls: ['./tile-title-left.component.scss']
})
export class TileTitleLeftComponent implements OnInit {

  darkModeActivated: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

}
