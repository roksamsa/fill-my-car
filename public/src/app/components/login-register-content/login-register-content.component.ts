import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-register-content',
  templateUrl: './login-register-content.component.html',
  styleUrls: ['./login-register-content.component.scss']
})
export class LoginRegisterContentComponent implements OnInit {

  @Input() loginRegisterContentTitle: String;
  @Input() loginRegisterContentContent: String;

  constructor() { }

  ngOnInit() {
  }

}
