import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {

  private userMenuState = new BehaviorSubject(false);
  currentUserMenuState = this.userMenuState.asObservable();

  constructor() { }

  changeUserMenuVisibility(userMenuVisibility: boolean) {
    this.userMenuState.next(userMenuVisibility);
  }
}
