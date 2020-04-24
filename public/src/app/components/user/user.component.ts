import { Component } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../../core/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  public userData: any;
  public userEmail: any;
  public userDisplayName: any;
  public userPhotoURL: any;
  public userAvatarFirstLetter: any;
  public isUserLoggedIn: any;

  constructor(
    public userService: UserService,
    public authService: FirebaseAuthService,
    private route: ActivatedRoute) {
      this.isUserLoggedIn = this.authService.isLoggedIn;
      this.userData = this.authService.getUserData;
      this.userEmail = this.authService.getUserData.email;
      this.userDisplayName = this.authService.getUserData.displayName;
      this.userPhotoURL = this.authService.getUserData.photoURL;
      this.userAvatarFirstLetter = this.userEmail.charAt(0);
  }
}
