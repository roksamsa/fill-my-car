import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-my-trip-dialog',
  templateUrl: './share-my-trip-dialog.component.html',
  styleUrls: ['./share-my-trip-dialog.component.scss']
})
export class ShareMyTripDialogComponent implements OnInit {

  public currentDomainName: string;
  public currentURL: string;
  public status: string;

  private snackBarStringForWhenMakeTripLinkCopy = 'Povezava poti je bila kopirana v odložišče.';

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedVehicleData: any,
    public authService: FirebaseAuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<ShareMyTripDialogComponent>) {
  }

  ngOnInit(): void {
    this.currentURL = this.router.url;
    this.currentDomainName = window.location.hostname;
  }

  private openSnackBarWhenMakeTripLinkCopy(): void {
    this._snackBar.open(this.snackBarStringForWhenMakeTripLinkCopy, 'Zapri', {
      duration: 7500,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  public copyToClipboard(event: string): void {
    const message = `'${event}' has been copied to clipboard`
    console.log(message);
    this.status = message;
    this.openSnackBarWhenMakeTripLinkCopy();
  }

  public onCloseCancel(): void {
    this.thisDialogRef.close('Cancel');
  }
}
