import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }
}
