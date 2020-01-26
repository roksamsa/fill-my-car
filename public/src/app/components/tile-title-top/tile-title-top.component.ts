import { Component, OnInit } from '@angular/core';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-tile-title-top',
  templateUrl: './tile-title-top.component.html',
  styleUrls: ['./tile-title-top.component.scss']
})

export class TileTitleTopComponent implements OnInit {

  darkModeActivated: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }
}
