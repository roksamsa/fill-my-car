import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserMenuService {

  private userMenuThemeModeState = new BehaviorSubject(false);
  currentUserMenuThemeModeState = this.userMenuThemeModeState.asObservable();

  constructor() { }

  changeToDarkMode(userMenuThemeModeState: boolean) {
    this.userMenuThemeModeState.next(userMenuThemeModeState);
  }
}
