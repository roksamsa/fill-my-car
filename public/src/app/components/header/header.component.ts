import { Component, OnInit, NgZone } from '@angular/core';
import { trigger, query, style, group, animate, transition, state } from '@angular/animations';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';

export const defaultAnimationFunction = 'ease-in-out';

export const logoFadeInAnimationTiming = '150ms';
export const logoFadeOutAnimationTiming = '150ms';
export const logoAnimationDelay = '450ms';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '150ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerFadeIn', [
      transition(':enter', [
        group([
          query('.header__background', [
            style({
              height: '0'
            }),
            animate(`${logoFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
              height: '100%'
            }))
          ]),
          query('.header__menu', [
            style({
              opacity: 0
            }),
            animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
              opacity: 1
            }))
          ], { optional: true }),
          query('.header__right', [
            style({
              opacity: 0
            }),
            animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
              opacity: 1
            }))
          ]),
          query('.header__logo', [
            style({
              opacity: 0,
              transform: 'translateX(-40px)'
            }),
            animate(`${logoFadeInAnimationTiming} ${logoAnimationDelay} ${defaultAnimationFunction}`, style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ])
        ])
      ])
    ]),
    trigger('createContentWrapperAnimation', [
      state('true', style({
        transform: 'translateX(0)'
      })),
      state('false', style({
        transform: 'translateX(235px)'
      })),
      transition('false <=> true', animate(`300ms ${defaultAnimationFunction}`))
    ])
  ]
})

export class HeaderComponent implements OnInit {

  clickActiveState  = false;
  dialogResult = '';
  createContentVisibility = false;

  constructor(
    private authService: AuthService,
    private headerData: HeaderService,
    private popupTrip: MatDialog,
    public router: Router,
    public ngZone: NgZone) {}

  ngOnInit() {
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.clickActiveState = clickActiveState);
  }

  setUserMenuVisibility() {
    this.clickActiveState = !this.clickActiveState;
    this.headerData.changeUserMenuVisibility(this.clickActiveState);

    // If user logs out
    if (this.authService.userData.uid.length < 0) {
      this.headerData.changeUserMenuVisibility(false);
    }
  }

  clickOutsideUserMenuVisibility() {
    this.headerData.changeUserMenuVisibility(false);
  }

  isCreateContentVisible() {
    this.createContentVisibility = !this.createContentVisibility;
    console.log(this.createContentVisibility);
  }

  // Add vehicle dialog popup
  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupTrip.open(CreateVehicleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

  // Add trip dialog popup
  openAddTripDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupTrip.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }
}
