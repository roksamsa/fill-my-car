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
  buttonClicked: boolean;

  constructor(private userMenuDarkThemeData: UserMenuService) { }

  ngOnInit() {
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

  clickFunction() {
    const that = this;
    this.clicked.emit('clickFunction');
    this.buttonClicked = true;

    setTimeout(function() {
      that.buttonClicked = false;
    }, 500);
  }

}
