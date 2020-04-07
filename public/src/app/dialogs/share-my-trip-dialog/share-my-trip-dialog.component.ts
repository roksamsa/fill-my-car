import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-my-trip-dialog',
  templateUrl: './share-my-trip-dialog.component.html',
  styleUrls: ['./share-my-trip-dialog.component.scss']
})
export class ShareMyTripDialogComponent implements OnInit {

  public currentDomainName: string;
  public currentURL: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedVehicleData: any,
    public authService: FirebaseAuthService,
    private fb: FormBuilder,
    private router: Router,
    public thisDialogRef: MatDialogRef<ShareMyTripDialogComponent>) {
  }

  ngOnInit(): void {
    this.currentURL = this.router.url;
    this.currentDomainName = window.location.hostname;
  }

  public copyToClipboard(event: string): void {
    console.log(event);
  }

  public onCloseCancel(): void {
    this.thisDialogRef.close('Cancel');
  }

}
