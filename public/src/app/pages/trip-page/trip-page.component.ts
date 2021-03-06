import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
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
import { ShareMyTripDialogComponent } from '../../dialogs/share-my-trip-dialog/share-my-trip-dialog.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { VehicleSeatsService } from '../../components/vehicle-seats/vehicle-seats.service';
import { ConstantsService } from '../../common/services/constants.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  public areThereAnyTrips = false;
  public tripFromLocationCity = '';
  public tripToLocationCity = '';
  public tripMessage: string;
  public hereMapStart = '';
  public hereMapFinish = '';
  public dialogResult: '';
  public statusIconTooltip: string;
  public tripComfortable: boolean;
  public tripStopsOnTheWayToFinalDestination: boolean;
  public tripPetsAreAllowed: boolean;
  public tripPassengersCanSmoke: boolean;
  public tripQuiet: boolean;

  private currentTripId: string;
  private tripIdTag: string;
  private tripId: string;

  preloadingSpinnerVisibility = true;

  tripDate: any;
  tripCreationDate: any;
  tripEditedDate: any;
  tripDateFormatted: any;
  currentDate = this.constant.currentDate;
  public dateFormat = this.constant.dateFormat;
  public dateFormatWithoutTime = this.constant.dateFormatWithoutTime;

  isTripActive: boolean;

  selectedVehicleId = '';

  selectedTypeData = '';
  selectedBrandData = '';
  selectedNameData = '';
  selectedBrandDataWithoutSpaces = '';
  selectedColorData = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  // Koliko sedežev je na voljo na poti. Ne pozabi, največje število je možno iz vozila, koliko jih ima.
  seatsAvailableNumber: number;
  seatsTakenNumber: number; // Na koncu moram to številko posodobit!
  seatsFreeNumber: number;
  seatsSelectedNumberFromInput = 1; // Izbrana številka v inputu!
  seatsFreeNumberForInput: number;

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
    private router: Router,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private tripPassengerService: TripPassengerService,
    private popupDialog: MatDialog,
    private titleService: Title,
    private form: FormBuilder,
    private constant: ConstantsService,
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
          passengerPhoneNumber: ['', Validators.required]
        }),
        this.form.group({
        })
      ])
    });
  }

  ngOnInit() {
    this.fetchTrip();
  }

  preloadingSpinnerShow() {
    const that = this;
    this.preloadingSpinnerVisibility = true;

    setTimeout(function() {
      that.preloadingSpinnerVisibility = false;
    }, 800);
  }

  getSocialUser() {
    this.authSocialService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(user);
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

  checkIfTripIsActive(): void {
    if (this.currentDate < this.tripDateFormatted) {
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
          this.tripId = data.id;
          this.tripIdTag = data.tripIdTag;
          this.areThereAnyTrips = true;
          this.tripFromLocationCity = data.tripFromLocation.split(', ')[0];
          this.tripToLocationCity = data.tripToLocation.split(', ')[0];
          this.hereMapStart = data.tripFromLocation;
          this.hereMapFinish = data.tripToLocation;
          this.selectedVehicleId = data.selectedVehicle;
          this.tripDate = data.tripDate;
          this.tripDateFormatted = new Date(this.tripDate);
          this.tripCreationDate = data.tripCreationDate;
          this.tripEditedDate = data.tripEditedDate;
          this.tripComfortable = data.tripComfortable;
          this.tripStopsOnTheWayToFinalDestination = data.tripStopsOnTheWayToFinalDestination;
          this.tripMessage = data.tripMessage;
          this.tripPetsAreAllowed = data.tripPetsAreAllowed;
          this.tripPassengersCanSmoke = data.tripPassengersCanSmoke;
          this.tripQuiet = data.tripQuiet;

          this.seatsAvailableNumber = data.tripAvailableSeats;
          this.seatsTakenNumber = data.tripTakenSeats;
          this.seatsFreeNumber = data.tripFreeSeats;
          this.seatsFreeNumberForInput = data.tripFreeSeats;
          this.vehicleSeatsData.changeVehicleSeatsAvailableNumber(this.seatsAvailableNumber);
          this.vehicleSeatsData.changeVehicleSeatsTakenNumber(this.seatsTakenNumber);

          console.log(this.seatsAvailableNumber);
          console.log(this.seatsTakenNumber);
          console.log(this.seatsFreeNumber);

          this.titleService.setTitle('Potovanje #' + this.tripIdTag + ': ' + this.tripFromLocationCity + ' - ' + this.tripToLocationCity);
          this.fetchVehicle(this.selectedVehicleId);
          this.checkIfTripIsActive();
          this.setNewSeatsData();

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

  // Share my trip dialog popup
  openShareMyTripDialog(trip: any, tripIndex: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '100px'
    };
    dialogConfig.data = trip;

    const dialogRef = this.popupDialog.open(ShareMyTripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

  // Delete specific trip
  deleteTrip(id: any) {
    this.tripService.deleteTrip(id)
      .subscribe(() => {
        this.router.navigate(['/nadzorna-plosca']);
      });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  seatsInputChange(value: number) {
    this.seatsSelectedNumberFromInput = value;
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(this.seatsSelectedNumberFromInput);
  }

  joinTripStart() {
    this.stepper.next();
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(this.seatsSelectedNumberFromInput);
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
    this.seatsSelectedNumberFromInput = 0;
    this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(0);
  }

  goToFirstStepWithDelay() {
    const that = this;

    setTimeout(function() {
      that.stepper.selectedIndex = 0;
    }, 3000);
  }

  setNewSeatsData() {
    this.vehicleSeatsData.vehicleSeatsTakenNumberData.subscribe((takenNumber) => {
      this.seatsTakenNumber = takenNumber;

      this.vehicleSeatsData.vehicleSeatsAvailableOnVehicleNumberData.subscribe((availableNumber) => {
        this.seatsFreeNumber = availableNumber;

        //this.seatsFreeNumber = this.seatsAvailableNumber - this.seatsTakenNumber;
      });
    });
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
    this.seatsTakenNumber = this.seatsTakenNumber + this.seatsSelectedNumberFromInput;
    this.seatsFreeNumber = this.seatsFreeNumber - this.seatsSelectedNumberFromInput;

    console.log('this.seatsFreeNumber:');
    console.log(this.seatsFreeNumber);
    console.log('this.seatsTakenNumber:');
    console.log(this.seatsTakenNumber);
    console.log('tripPassengerSeatsReservation:');
    console.log(tripPassengerSeatsReservation);
    console.log('this.seatsSelectedNumberFromInput:');
    console.log(this.seatsSelectedNumberFromInput);

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
      this.seatsTakenNumber,
      this.seatsFreeNumber,
    ).subscribe(() => {
      this.stepper.next();
      this.vehicleSeatsData.changeVehicleSeatsSeatsSelectedFromInput(0);
      this.vehicleSeatsData.changeVehicleSeatsAvailableNumber(this.seatsFreeNumber);
      this.vehicleSeatsData.changeVehicleSeatsTakenNumber(this.seatsTakenNumber);
      this.goToFirstStepWithDelay();
      this.fetchTrip();
    });
  }
}
