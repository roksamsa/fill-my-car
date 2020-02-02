import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(public authService: FirebaseAuthService) { }

  ngOnInit() {
  }

}
