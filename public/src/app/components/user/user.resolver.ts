import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { FirebaseUserModel } from '../../core/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  public isLoggedIn: Boolean;

  constructor(
    public userService: UserService,
    public router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {

    const user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        this.isLoggedIn = true;
        if (res.providerData[0].providerId === 'password') {
          user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
          user.name = 'Unknown';
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        } else {
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        return reject(err);
      });
    });
  }
}
