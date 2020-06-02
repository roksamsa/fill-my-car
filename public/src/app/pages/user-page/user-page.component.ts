import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public currentUser: any;
  public currentUserName: any;
  public currentUserNameLowerCase: any;
  public currentUserFromRouterLink: any;
  public currentUserFromRouterLinkLowerCase: any;

  constructor(public authService: FirebaseAuthService,
              private titleService: Title,
              public router: Router,
              private route: ActivatedRoute) {
    this.currentUser = authService.currentUserData;
    this.currentUserName = authService.currentUserData.displayName;
    this.currentUserNameLowerCase = this.currentUserName.replace(/ /g, '.').toLowerCase();
  }

  ngOnInit() {
    this.titleService.setTitle(this.currentUser.displayName);
    this.fetchUserIdFromRouterLink();

  }

  // Fetch all trips for specific user
  public fetchUserIdFromRouterLink(): void {
    this.route.paramMap.subscribe(params => {
      this.currentUserFromRouterLink = params.get('user');
      this.currentUserFromRouterLinkLowerCase = this.currentUserFromRouterLink.replace(/\./g, '.').toLowerCase();

      if (this.currentUserFromRouterLinkLowerCase !== this.currentUserNameLowerCase) {
        this.router.navigate(['**']);
      }
    });
  }
}
