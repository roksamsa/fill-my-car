import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TripService } from '../../core/trip/trip.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { Trip } from '../../core/trip/trip.module';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { HereMapsService } from '../../../app/components/here-maps/here-maps.service';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ConstantsService } from '../../common/services/constants.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-trip-dialog',
  templateUrl: './create-trip-dialog.component.html',
  styleUrls: ['./create-trip-dialog.component.scss']
})
export class CreateTripDialogComponent implements OnInit {

  public currentUser: any;
  public vehicle: Vehicle;
  selectedVehicleId = '';

  addTripFormStepperForm: FormGroup;
  vehicles: Vehicle[] = [];
  vehicleId: string;

  // Trip ID generator
  tripIdTagCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  tripIdTagCharactersLength = this.tripIdTagCharacters.length;
  tripIdTagMaxLength = 6;
  public tripIdTag = '';

  // Here map
  hereMapStart = '';
  hereMapFinish = '';

  locationStartSuggestions: any;
  locationStartInputValue: any;
  locationStartSelected: any;
  locationFinishInputValue: any;
  locationFinishSuggestions: any;
  locationFinishSelected: any;

  // Preloader
  preloadingSpinnerDiameter = 42;
  preloadingSpinnerStrokeWidth = 5;
  preloadingSpinnerMode = 'indeterminate';
  preloadingSpinnerVisibility: boolean;

  public areThereAnyVehicles = false;
  public areThereAnyTrips = false;

  // Date values
  dateFormat = 'EEEE, dd. MMMM yyyy, HH:mm';
  dateLocale = 'sl-SI';
  dateDayValue = 0;
  dateMonthValue = 0;
  dateYearValue = 2020;
  dateHourValue = 0;
  dateMinutesValue = 0;
  dateHourString = '00';
  dateMinutesString = '00';
  dateInputValue: string;
  dateValue = new Date();
  currentDate = this.constant.currentDate;
  currentDateString = '';

  public tripDriverName = '';
  public tripDriverEmail = '';

  // Seats
  vehicleSeatsAvailableValue = 0;
  seatsAvailableValue = 0;
  seatsTakenValue = 0;
  seatsFreeValue = 0;

  takenSeatsValue = 0;
  priceValue = 0;
  luggageSpaceValue = 0;

  trips: Trip[] = [];

  public isAcceptPassengersChecked = 'auto';
  public isTripStopsOnTheWayToFinalDestinationChecked = false;
  public isTripComfortableChecked = false;
  public isTripPetsAreAllowedChecked = false;
  public isTripPassengersCanSmokeChecked = false;
  public isTripQuietChecked = false;

  @ViewChild('tripFromLocation') tripFromLocation: ElementRef;
  @ViewChild('tripToLocation') tripToLocation: ElementRef;
  @ViewChild('swapLocationButton') swapLocationButton: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;

  /** Returns a FormArray with the name 'formArray'. */
  get addTripFormStepperFormArray(): AbstractControl | null {
    return this.addTripFormStepperForm.get('addTripFormStepperFormArray');
  }

  constructor(
    private vehicleService: VehicleService,
    private tripService: TripService,
    private form: FormBuilder,
    private datePipe: DatePipe,
    private titleService: Title,
    private _snackBar: MatSnackBar,
    public authService: FirebaseAuthService,
    public hereMap: HereMapsService,
    public constant: ConstantsService,
    public thisDialogRef: MatDialogRef<CreateTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    this.currentUser = this.authService.currentUserData;
    this.addTripFormStepperForm = this.form.group({
      addTripFormStepperFormArray: this.form.array([
        this.form.group({
          belongsToUser: '',
          selectedVehicle: ['', Validators.required],
          tripIdTag: '',
          tripStatus: '',
          tripFromLocation: ['', Validators.required],
          tripToLocation: ['', Validators.required],
          tripDateInput: ['', Validators.required],
          tripTime: ['', Validators.required],
          tripFreeSeats: ['', Validators.required],
          tripPrice: ['', Validators.required],
          luggageSpaceValue: ''
        }),
        this.form.group({
          tripMessage: '',
          tripStopsOnTheWayToFinalDestination: false,
          tripComfortable: false,
          tripPetsAreAllowed: false,
          tripPassengersCanSmoke: false,
          tripQuiet: false
        }),
        this.form.group({
          isAcceptPassengersChecked: 'auto'
        })
      ])
    });
    this.currentDateString = this.datePipe.transform(this.currentDate, this.dateFormat, this.dateLocale);
    this.tripDriverName = this.authService.userOnlyName;
    this.tripDriverEmail = this.currentUser.providerData[0].email;
  }

  private snackBarStringForWhenTripIsCreated: string;

  private openSnackBarWhenTripIsCreated(): void {
    this._snackBar.open(this.snackBarStringForWhenTripIsCreated, 'Zapri', {
      duration: 7500,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
    this.titleService.setTitle('Dodajanje novega potovanja');
    this.createTripIdTag();
    this.snackBarStringForWhenTripIsCreated = 'Ustvarili ste potovanje: ' + this.tripIdTag + '.';
  }

  public stepperGoPreviousStep() {
    this.stepper.previous();
  }

  public stepperGoNextStep() {
    this.stepper.next();
  }

  // START LOCATION SELECTION
  // [1] Get input value for start destintaion
  valueChangeStartDestination(event: any): void {
    this.locationStartInputValue = event.target.value;
    this.showStartLocationSuggestions(this.locationStartInputValue);
  }

  // [2] Show start location suggestions
  showStartLocationSuggestions(location: any): void {
    this.hereMap.getCoordinates(location).then(geocoderResult => {
      this.locationStartSuggestions = geocoderResult;
    });
  }

  selectStartLocationSuggestion(selectedStartLocation: any): void {
    this.hereMapStart = selectedStartLocation;
  }

  // FINISH LOCATION SELECTION
  // [1] Get input value for finish destintaion
  valueChangeFinishDestination(event: any): void {
    this.locationFinishInputValue = event.target.value;
    this.showFinishLocationSuggestions(this.locationFinishInputValue);
  }

  // [2] Show finish location suggestions
  showFinishLocationSuggestions(location: any): void {
    this.hereMap.getCoordinates(location).then(geocoderResult => {
      this.locationFinishSuggestions = geocoderResult;
    });
  }

  selectFinishLocationSuggestion(selectedFinishLocation: any): void {
    this.hereMapFinish = selectedFinishLocation;
  }

  // Change Start for Finish location
  swapStartFinishLocation(): void {
    const dataLocation1 = this.tripFromLocation.nativeElement.value;
    const dataLocation2 = this.tripToLocation.nativeElement.value;

    if (this.tripFromLocation && this.tripFromLocation) {
      this.tripFromLocation.nativeElement.value = dataLocation2;
      this.tripToLocation.nativeElement.value = dataLocation1;
      this.hereMapStart = this.tripFromLocation.nativeElement.value;
      this.hereMapFinish = this.tripToLocation.nativeElement.value;
    } else {
      this.hereMapStart = dataLocation1;
      this.hereMapFinish = dataLocation2;
    }
  }

  // Generate random ID for trip
  private createTripIdTag(): void {
    for (let i = 0; i < this.tripIdTagMaxLength; i++) {
      this.tripIdTag += this.tripIdTagCharacters.charAt(Math.floor(Math.random() * this.tripIdTagCharactersLength));
    }
  }

  // Fetch all vehicles for specific user
  fetchVehicles(): void {
    this.vehicleService.getVehicleByUser(this.currentUser.uid).subscribe((data: Vehicle[]) => {
      if (data.length > 0) {
        this.vehicles = data;
        this.vehicleId = data[0].id;
      } else {
        this.vehicles = null;
      }
    });
  }

  // Fetch all vehicles for specific user
  fetchVehicle(vehicleID: any): void {
    this.vehicleService.getVehicleById(vehicleID)
      .pipe(filter(x => !!x))
      .subscribe((selectedVehicleData) => {
        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          this.vehicleSeatsAvailableValue = this.vehicle.vehicleSeats;
          this.seatsFreeValue = this.vehicleSeatsAvailableValue;
        } else {
          this.vehicle = null;
        }
      });
  }

  // Fetch all trips for specific user
  fetchTrips(): void {
    this.tripService.getTripsByUser(this.currentUser.uid)
      .subscribe((data: Trip[]) => {
        if (data) {
          this.trips = data;
          this.areThereAnyTrips = true;
          this.preloadingSpinnerVisibility = false;
        } else {
          this.trips = null;
          this.areThereAnyTrips = false;
          this.preloadingSpinnerVisibility = true;
        }
      });
  }

  // Check if we get some vehicles from user or not
  isVehicleListEmpty(): boolean {
    return this.areThereAnyVehicles;
  }

  getSelectedVehicleData(event: any): void {
    this.selectedVehicleId = event.value;
    this.fetchVehicle(this.selectedVehicleId);
  }

  public tripStopsOnTheWayToFinalDestinationChange(): void {
    this.isTripStopsOnTheWayToFinalDestinationChecked = (this.isTripStopsOnTheWayToFinalDestinationChecked === true) ? false : true;
  }

  public tripComfortableChange(): void {
    this.isTripComfortableChecked = (this.isTripComfortableChecked === true) ? false : true;
  }

  public tripPetsAreAllowedChange(): void {
    this.isTripPetsAreAllowedChecked = (this.isTripPetsAreAllowedChecked === true) ? false : true;
  }

  public tripPassengersCanSmokeChange(): void {
    this.isTripPassengersCanSmokeChecked = (this.isTripPassengersCanSmokeChecked === true ) ? false : true;
  }

  public tripQuietChange(): void {
    this.isTripQuietChecked = (this.isTripQuietChecked === true ) ? false : true;
  }

  acceptPassengersChange(event: any) {
    this.isAcceptPassengersChecked = event.value;
  }

  // "tripDate": "2020-03-27T10:25:00.000Z",YYYY-MM-DDThh:mm:ssTZD

  // Date setup
  public getDateFromInput(event: any): void {
    if (event) {
      this.dateDayValue = event.getDate();
      this.dateMonthValue = event.getMonth() + 1; // Because getMonth() starts from 0!
      this.dateYearValue = event.getFullYear();
      this.setDate();
    }
  }

  public timeHourChanged(value: number): void {
    this.dateHourValue = value;
    this.dateHourString = this.constant.numberZeroPadding(value);
    this.setDate();
  }

  public timeMinutesChanged(value: number): void {
    this.dateMinutesValue = value;
    this.dateMinutesString = this.constant.numberZeroPadding(value);
    this.setDate();
  }

  public setFinalDateValue(): void {
    this.setDate();
  }

  public setDate(): Date {
    if (this.dateMonthValue || this.dateDayValue || this.dateYearValue || this.dateHourValue || this.dateMinutesValue) {
      this.dateInputValue =
        this.dateYearValue + '-' +
        this.constant.numberZeroPadding(this.dateMonthValue) + '-' +
        this.constant.numberZeroPadding(this.dateDayValue) + 'T' +
        this.constant.numberZeroPadding(this.dateHourValue) + ':' +
        this.constant.numberZeroPadding(this.dateMinutesValue) + ':00';
      this.dateValue = new Date(this.dateInputValue);
      // Expected result '1995-12-17T03:24:00'
      return this.dateValue;
    }
  }

  freeSeatsChanged(value: number) {
    this.seatsAvailableValue = value;
  }

  priceChanged(value: number): void {
    this.priceValue = value;
  }

  luggageSpace(value: number): void {
    this.luggageSpaceValue = value;
  }

  // Add vehicle on popup close
  addTrip(
    belongsToUser: string,
    selectedVehicle: string,
    tripStatus: string,
    tripIdTag: string,
    tripFromLocation: string,
    tripToLocation: string,
    tripCreationDate: Date,
    tripEditedDate: Date,
    tripDate: Date,
    tripTimeHour: string,
    tripTimeMinutes: string,
    tripDriverName: string,
    tripDriverEmail: string,
    tripAvailableSeats: number,
    tripTakenSeats: number,
    tripFreeSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripNewPassengersAcceptance: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripPassengersCanSmoke: boolean,
    tripPetsAreAllowed: boolean,
    tripQuiet: boolean) {
    this.setFinalDateValue();
    this.tripService.addTrip(
      belongsToUser,
      selectedVehicle,
      tripStatus,
      tripIdTag,
      tripFromLocation,
      tripToLocation,
      tripCreationDate,
      tripEditedDate,
      tripDate,
      tripTimeHour,
      tripTimeMinutes,
      tripDriverName,
      tripDriverEmail,
      tripAvailableSeats,
      tripTakenSeats,
      tripFreeSeats,
      tripPrice,
      tripLuggageSpace,
      tripMessage,
      tripNewPassengersAcceptance,
      tripComfortable,
      tripStopsOnTheWayToFinalDestination,
      tripPassengersCanSmoke,
      tripPetsAreAllowed,
      tripQuiet).subscribe(() => {
        this.thisDialogRef.close('Confirm');
        this.openSnackBarWhenTripIsCreated();
      });
  }

  // Cancel adding vehicle on popup close
  public onCloseCancel(): void {
    this.thisDialogRef.close('Cancel');
  }
}
