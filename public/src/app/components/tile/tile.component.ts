import { Component, OnInit } from '@angular/core';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  darkModeActivated: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

}
