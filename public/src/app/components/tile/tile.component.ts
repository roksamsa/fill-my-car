import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit {

  darkModeActivated: boolean;

  @Input() tileTitle: String;
  @Input() tileHeadlineAddButtonTooltipText: String;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

  clickFunction() {
    this.clicked.emit('clickFunction');
  }

}
