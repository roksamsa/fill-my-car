import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { UserMenuService } from '../app/components/user-menu/user-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Napolni moj avto';
  darkModeActivated: boolean;

  constructor(
    private adapter: DateAdapter<any>,
    private userMenuDarkThemeData: UserMenuService) {
  }

  ngOnInit() {
    this.adapter.setLocale('sl');
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }
}
