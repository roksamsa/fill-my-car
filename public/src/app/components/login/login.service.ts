import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

  private isLoginFormVisibleState = new BehaviorSubject(false);
  currentLoginFormVisibleState = this.isLoginFormVisibleState.asObservable();

  constructor() { }

  changeLoginRegisterVisibility(loginFormVisibility: boolean) {
    this.isLoginFormVisibleState.next(loginFormVisibility);
  }
}
