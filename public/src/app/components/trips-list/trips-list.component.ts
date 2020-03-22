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
  displayedColumns: string[] = [
    'tripStatus',
    'tripIdTag',
    'selectedTrip',
    'tripFromLocation',
    'tripToLocation',
    'tripDate',
    'tripCategory',
    'tripDistance',
    'tripDuration',
    'tripPrice',
    'tripLuggageSpace',
  ];

  tripStatusString: string;

  tripDate: any;
  tripDateFormatted: any;
  currentDate = this.constant.currentDate;
  tripTime: any;
  isTripActive: boolean;
  public statusIconTooltip: String;

  constructor(
    private popupDialog: MatDialog,
    private constant: ConstantsService,
    private vehicleService: VehicleService,
    private tripService: TripService) { }

  ngOnInit() {
    this.fetchTrips();
    this.isTripsListEmpty();
  }

  moreActionsToggle(tripIndex) {
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
    console.log(this.tripDateFormatted);
    console.log(this.currentDate);
  }

  public makeTripDateFormatted(date): Date {
    return new Date(date);
  }

  // Delete specific trip
  deleteTrip(id: any) {
    this.tripService.deleteTrip(id)
      .subscribe(() => {
        this.fetchTrips();
        this.moreActionOpened = -1;
      });
  }

  preloadingSpinnerShow() {
    const that = this;
    this.preloadingSpinnerVisibility = true;

    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 500);
  }

  // Fetch all trips for specific user
  fetchTrips() {
    this.tripService.getTripsByUser(this.currentUser.uid).subscribe((data: any) => {
      if (data.length > 0) {
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
    dialogConfig.position = {
      top: '100px'
    };
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
    dialogConfig.position = {
      top: '100px'
    };

    const dialogRef = this.popupDialog.open(CreateTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTrips();
      this.dialogResult = result;
    });
  }
}
