import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../app/components/header/header.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private headerData: HeaderService) { }

  ngOnInit() {
    this.headerData.changeHeaderVisibility(false);
  }
}
