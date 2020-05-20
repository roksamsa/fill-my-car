import { Component, OnInit } from '@angular/core';
import { TripService } from '../../core/trip/trip.service';
import { Trip } from '../../core/trip/trip.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { trigger, style, animate, transition } from '@angular/animations';
import { EditTripDialogComponent } from '../../dialogs/edit-trip-dialog/edit-trip-dialog.component';
import { CreateTripDialogComponent } from '../../dialogs/create-trip-dialog/create-trip-dialog.component';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { filter } from 'rxjs/operators';
import { ConstantsService } from '../../common/services/constants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const defaultAnimationFunction = 'ease-in-out';
export const headerFadeInAnimationTiming = '200ms';
export const headerFadeOutAnimationTiming = '200ms';
export const headerAnimationDelay = '100ms';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
  animations: [
    trigger('moreActionContainerAnimation', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(`${headerFadeInAnimationTiming} ${headerAnimationDelay} ${defaultAnimationFunction}`, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(`${headerFadeOutAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 0
        }))
      ])
    ]),
    trigger('moreActionBackgroundAnimation', [
      transition(':enter', [
        style({
          transform: 'scaleX(0)'
        }),
        animate(`${headerFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
          transform: 'scaleX(1)'
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'scaleX(1)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${headerAnimationDelay} ${defaultAnimationFunction}`, style({
          transform: 'scaleX(0)'
        }))
      ])
    ])
  ]
})

export class TripsListComponent implements OnInit {
  public areThereAnyTrips = false;
  public trips: Trip[] = [];
  public vehicle: Vehicle;
  preloadingSpinnerVisibility = true;
  vehicleSeatsAvailableNumber: number;
  selectedVehicleId = '';
  createButtonTooltipText = 'Dodaj novo potovanje';

  emptyDataType = 'vertical';
  emptyDataText = 'Še nisi delil prevoza z drugimi.';
  emptyDataIcon = 'trip';
  emptyDataButtonText = 'Načrtuj novo potovanje';

  selectedTrip: any;
  selectedTripIndex = '';
  currentUser = JSON.parse(localStorage.getItem('user'));
  dialogResult: '';
  tripFromLocationCity = '';
  moreActionVisible: any;
  moreActionOpened = -1;
  dateFormat = 'dd. MMMM yyyy';
  dateLocale = 'sl-SI';

  tripStatusString: string;

  tripDate: any;
  tripDateFormatted: any;
  currentDate = this.constant.currentDate;
  tripTime: any;
  isTripActive: boolean;
  public statusIconTooltip: String;

  public currentDomainName: string;
  public currentURL = '/potovanje/';
  public tripIdTagValue = '';
  public status: string;
  private snackBarStringForWhenMakeTripLinkCopy = 'Povezava poti je bila kopirana v odložišče.';

  constructor(
    private popupDialog: MatDialog,
    private constant: ConstantsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private vehicleService: VehicleService,
    private tripService: TripService) { }

  public ngOnInit(): void {
    this.fetchTrips();
    this.isTripsListEmpty();
    this.currentDomainName = window.location.hostname;
  }

  public moreActionsToggle(tripIndex): void {
    if (this.moreActionOpened !== tripIndex) {
      this.moreActionOpened = tripIndex;
    } else {
      this.moreActionOpened = -1;
    }
  }

  private checkIfTripIsActive(): void {
    if (this.currentDate < this.tripDateFormatted) {
      this.isTripActive = true;
      this.statusIconTooltip = 'Potovanje je aktivno';
    } else {
      this.isTripActive = false;
      this.statusIconTooltip = 'Potovanje ni aktivno';
    }
  }

  public makeTripDateFormatted(date: Date): Date {
    return new Date(date);
  }

  // Delete specific trip
  public deleteTrip(id: string): void {
    this.tripService.deleteTrip(id)
      .subscribe(() => {
        this.fetchTrips();
        this.moreActionOpened = -1;
      });
  }

  public preloadingSpinnerShow(): void {
    const that = this;
    this.preloadingSpinnerVisibility = true;

    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 500);
  }

  // Fetch all trips for specific user
  public fetchTrips(): void {
    this.tripService.getTripsByUser(this.currentUser.uid).subscribe((data: any) => {
      if (data.length > 0 && data != null) {
        this.trips = data;
        this.areThereAnyTrips = true;
        this.preloadingSpinnerShow();
        this.selectedVehicleId = data[0].selectedVehicle;
        this.fetchVehicle(this.selectedVehicleId);
      } else {
        this.trips = null;
        this.areThereAnyTrips = false;
        this.preloadingSpinnerShow();
      }
    });
  }

  // Fetch all vehicles for specific user
  fetchVehicle(vehicleID) {
    this.vehicleService.getVehicleById(vehicleID)
      .pipe(filter(x => !!x))
      .subscribe((selectedVehicleData) => {
        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          this.vehicleSeatsAvailableNumber = this.vehicle.vehicleSeats;
        } else {
          this.vehicle = null;
        }
      });
  }

  // Check if we get some vehicles from user or not
  isTripsListEmpty(): boolean {
    return this.areThereAnyTrips;
  }

  editTrip(trip: any, tripIndex: any) {
    if (trip === this.selectedTrip) {
      this.selectedTrip = '';
      this.selectedTripIndex = null;
    } else {
      this.selectedTrip = trip;
      this.selectedTripIndex = tripIndex;
    }
  }

  // Edit vehicle dialog popup
  openEditVehicleDialog(trip: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';
    dialogConfig.data = trip;

    const dialogRef = this.popupDialog.open(EditTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      this.fetchTrips();
    });
  }

  // Add trip dialog popup
  openAddTripDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '1100px';

    const dialogRef = this.popupDialog.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTrips();
      this.dialogResult = result;
    });
  }

  public linkToSelectedTrip(tripIdTag: string): void {
    this.router.navigate(['/potovanje/', tripIdTag]);
    this.tripIdTagValue = tripIdTag;
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
    this.moreActionOpened = -1;
  }
}
