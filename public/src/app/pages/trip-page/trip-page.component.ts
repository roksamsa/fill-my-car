import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location, DatePipe, formatDate } from '@angular/common';
import { TripService } from '../../core/trip/trip.service';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { TripPassengerService } from '../../core/trip-passenger/trip-passenger.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Trip } from '../../core/trip/trip.module';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTripDialogComponent } from '../../dialogs/edit-trip-dialog/edit-trip-dialog.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { VehicleSeatsService } from '../../components/vehicle-seats/vehicle-seats.service';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss'],
  providers: [DatePipe]
})

export class TripPageComponent implements OnInit {
  public vehicle: Vehicle;
  public trip: Trip;
  public currentUser = JSON.parse(localStorage.getItem('user'));
  public dateFormat = 'EEEE, dd. MMMM yyyy';
  public dateFormat2 = 'dd. MMMM yyyy';
  public areThereAnyTrips = false;
  public tripFromLocationCity = '';
  public tripToLocationCity = '';
  public hereMapStart = '';
  public hereMapFinish = '';
  public dialogResult: '';
  public statusIconTooltip: String;

  private currentTripId: String;

  preloadingSpinnerVisibility = true;

  tripDate: any;
  tripDateFormatted: any;
  currentDate = new Date();
  currentDateFormatted = formatDate(this.currentDate, this.dateFormat2, 'en');
  isTripActive: boolean;

  selectedVehicleId = '';

  selectedTypeData = '';
  selectedBrandData = '';
  selectedNameData = '';
  selectedBrandDataWithoutSpaces = '';
  selectedColorData = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  vehicleSeatsTakenNumber: number; // Na koncu moram to številko posodobit!
  vehicleSeatsAvailableNumber: number;
  vehicleSeatsStillLeftForCurrentTrip: number;
  vehicleSeatsSelectedNumber = 0; // Izbrana številka v inputu!

  public socialUser: SocialUser;
  public socialUserLoggedIn: boolean;

  public addTripFormStepperForm: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;

  get addTripFormStepperFormArray(): AbstractControl | null {
    return this.addTripFormStepperForm.get('addTripFormStepperFormArray');
  }

  constructor(
    public authService: FirebaseAuthService,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private tripPassengerService: TripPassengerService,
    private popupDialog: MatDialog,
    private form: FormBuilder,
    private location: Location,
    private authSocialService: AuthService,
    public vehicleSeatsData: VehicleSeatsService,
    private cdref: ChangeDetectorRef) {
    this.addTripFormStepperForm = this.form.group({
      addTripFormStepperFormArray: this.form.array([
        this.form.group({
        }),
        this.form.group({
        }),
        this.form.group({
          yourStartLocation: ['', Validators.required]
        }),
        this.form.group({
          yourEndLocation: ['', Validators.required]
        }),
        this.form.group({
        }),
        this.form.group({
        })
      ])
    });
  }

  ngOnInit() {
    this.fetchTrip();
    this.seatsData();
  }

  preloadingSpinnerShow() {
    const that = this;
    this.preloadingSpinnerVisibility = true;

    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 800);
  }

  seatsData() {
    this.vehicleSeatsData.vehicleSeatsTakenNumberData.subscribe((takenNumber) => {
      this.vehicleSeatsTakenNumber = takenNumber;
      this.vehicleSeatsData.vehicleSeatsAvailableOnVehicleNumberData.subscribe((availableNumber) => {
        this.vehicleSeatsAvailableNumber = availableNumber;
        this.vehicleSeatsStillLeftForCurrentTrip = this.vehicleSeatsAvailableNumber - this.vehicleSeatsTakenNumber;
      });
    });
  }

  getSocialUser() {
    this.authSocialService.authState.subscribe((user) => {
      this.socialUser = user;
      this.socialUserLoggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.getSocialUser();
  }

  signInWithFacebook(): void {
    this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.getSocialUser();
  }

  checkIfTripIsActive () {
    if (this.currentDateFormatted < this.tripDateFormatted) {
      this.isTripActive = true;
      this.statusIconTooltip = 'Potovanje je aktivno';
    } else {
      this.isTripActive = false;
      this.statusIconTooltip = 'Potovanje ni aktivno';
    }
  }

  // Fetch all trips for specific user
  fetchTrip() {
    this.route.paramMap.subscribe(params => {
      this.currentTripId = params.get('id');
      this.tripService.getTripById(this.currentTripId).subscribe((data: any) => {
        this.preloadingSpinnerShow();

        if (data !== null && data !== undefined) {
          this.trip = data;
          this.areThereAnyTrips = true;
          this.tripFromLocationCity = data.tripFromLocation.split(', ')[0];
          this.tripToLocationCity = data.tripToLocation.split(', ')[0];
          this.hereMapStart = data.tripFromLocation;
          this.hereMapFinish = data.tripToLocation;
          this.selectedVehicleId = data.selectedVehicle;
          this.tripDate = data.tripDate;
          this.tripDateFormatted = formatDate(this.tripDate, this.dateFormat2, 'en');

          this.vehicleSeatsData.changeVehicleSeatsTakenNumber(data.tripFreeSeats);
          this.fetchVehicle(this.selectedVehicleId);
          this.checkIfTripIsActive();

        } else {
          this.trip = null;
          this.areThereAnyTrips = false;
        }
      });
    });
  }

  fetchVehicle(vehicleID) {
    this.vehicleService.getVehicleById(vehicleID)
      .pipe(filter(x => !!x))
      .subscribe((selectedVehicleData) => {
        this.preloadingSpinnerShow();

        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          this.selectedTypeData = selectedVehicleData.vehicleType;
          this.selectedColorData = selectedVehicleData.vehicleColor;
          this.selectedBrandData = selectedVehicleData.vehicleBrand;
          this.selectedNameData = selectedVehicleData.vehicleName;

          this.vehicleSeatsData.changeVehicleSeatsAvailableNumber(selectedVehicleData.vehicleSeats);

        } else {
          this.vehicle = null;
        }
      });
  }

  // Edit vehicle dialog popup
  openEditVehicleDialog(trip: any, tripIndex: any) {
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
      this.fetchTrip();
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  seatsInputChange(value: number) {
    this.vehicleSeatsSelectedNumber = value;
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(this.vehicleSeatsSelectedNumber);
  }

  joinTripStart() {
    this.stepper.next();
    this.vehicleSeatsSelectedNumber = 1;
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(this.vehicleSeatsSelectedNumber);
  }

  joinTrip1() {
    this.stepper.next();
  }

  joinTrip2() {
    this.stepper.next();
  }

  joinTrip3() {
    this.stepper.next();
  }

  cancelTripBooking() {
    this.stepper.selectedIndex = 0;
    this.vehicleSeatsSelectedNumber = 0;
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(0);
  }

  goToFirstStepWithDelay() {
    const that = this;

    setTimeout(function() {
      that.stepper.selectedIndex = 0;
    }, 2000);
  }

  // Add vehicle on popup close
  joinTripSave (
    belongsToUser: string,
    belongsToVehicle: string,
    belongsToTrip: string,
    tripPassengerSeatsReservation: number,
    tripPassengerStartLocation: string,
    tripPassengerEndLocation: string,
    tripPassengerName: string,
    tripPassengerEmail: string,
    tripPassengerPhone: string) {
    const tripId = this.trip._id;
    const tripSeatsReservation = tripPassengerSeatsReservation;
    const updatedTripFreeSeats = this.vehicleSeatsTakenNumber + tripSeatsReservation;
    this.vehicleSeatsData.changeVehicleSeatsAvailableNumber(updatedTripFreeSeats);

    this.tripPassengerService.addTripPassenger(
      belongsToUser,
      belongsToVehicle,
      belongsToTrip,
      tripPassengerSeatsReservation,
      tripPassengerStartLocation,
      tripPassengerEndLocation,
      tripPassengerName,
      tripPassengerEmail,
      tripPassengerPhone).subscribe(() => {}
    );

    this.tripService.updateSeatsOnTrip(
      tripId,
      updatedTripFreeSeats,
      tripSeatsReservation
    ).subscribe(() => {
      this.stepper.next();
      this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(0);
      this.fetchTrip();
      this.goToFirstStepWithDelay();
    });
  }
}
