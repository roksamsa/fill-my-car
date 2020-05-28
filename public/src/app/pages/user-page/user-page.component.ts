import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { Title } from '@angular/platform-browser';;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public currentUser: any;

  constructor(public authService: FirebaseAuthService,
              private titleService: Title) {
    this.currentUser = this.authService.currentUserData;
  }

  ngOnInit() {
    this.titleService.setTitle(this.currentUser.displayName);
  }
}
