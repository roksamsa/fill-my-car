import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: FirebaseAuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
