import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../../core/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    public userService: UserService,
    public authService: FirebaseAuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }
}
