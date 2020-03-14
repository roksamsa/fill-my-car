import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserMenuService } from '../../components/user-menu/user-menu.service';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent implements OnInit {

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  @Input() buttonTooltipPosition = 'above';
  @Input() buttonTooltipText = '';

  darkModeActivated: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

  clickFunction() {
    this.clicked.emit('clickFunction');
  }

}
