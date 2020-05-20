import { Component, OnInit, NgZone } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateVehicleDialogComponent } from '../../dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';
import { UserMenuService } from '../user-menu/user-menu.service';
import { WebpageMenuService } from '../../webpage/components/webpage-menu/webpage-menu.service';
import { ConstantsService } from '../../common/services/constants.service';

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

  private dialogResult = '';
  private createContentVisibility = false;
  private loginRegisterOverlayVisibility = true;

  public clickActiveState = false;
  public darkModeActivated: boolean;
  public createButtonTooltipText = 'Dodaj novo vozilo ali potovanje';

  public userData: any;

  constructor(
    private headerData: HeaderService,
    private webpageMenuData: WebpageMenuService,
    private userMenuDarkThemeData: UserMenuService,
    private popupTrip: MatDialog,
    public authService: FirebaseAuthService,
    public constant: ConstantsService,
    public router: Router,
    public ngZone: NgZone) {
    }

  public ngOnInit(): void {
    this.headerData.currentUserMenuState.subscribe(clickActiveState => this.clickActiveState = clickActiveState);
    this.userMenuDarkThemeData.currentUserMenuThemeModeState.subscribe(clickActiveState => this.darkModeActivated = clickActiveState);
  }

  public setUserMenuVisibility(): void {
    this.clickActiveState = !this.clickActiveState;
    this.headerData.changeUserMenuVisibility(this.clickActiveState);
  }

  public clickOutsideUserMenuVisibility(): void {
    this.headerData.changeUserMenuVisibility(false);
  }

  public isCreateContentVisible(): void {
    this.createContentVisibility = !this.createContentVisibility;
    (this.createContentVisibility === true) ?
    this.createButtonTooltipText = 'Zapri dodajanje' :
    this.createButtonTooltipText = 'Dodaj novo vozilo ali potovanje';
  }

  // Add vehicle dialog popup
  public openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '600px';

    const dialogRef = this.popupTrip.open(CreateVehicleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

  // Add trip dialog popup
  public openAddTripDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';

    const dialogRef = this.popupTrip.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

  public redirectToHomeAndOpenLogin(): void {
    this.webpageMenuData.openLoginRegisterOverlay(this.loginRegisterOverlayVisibility);
  }
}
