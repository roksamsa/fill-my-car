import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { TripService } from '../../core/trip/trip.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { HereMapsService } from '../../../app/components/here-maps/here-maps.service';
import { vehicleTypes, VehicleTypesSetup } from '../../core/vehicle/vehicle-data.types';
import { vehicleBrands, VehicleBrandsSetup } from '../../core/vehicle/vehicle-data.brands';
import { vehicleColors, VehicleColorsSetup } from '../../core/vehicle/vehicle-data.colors';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ConstantsService } from '../../common/services/constants.service';
import { NumberPickerComponent } from '../../components/number-picker/number-picker.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.scss']
})

export class EditTripDialogComponent implements OnInit, AfterViewInit {

  public currentUser: any;
  addTripFormStepperForm: FormGroup;
  vehicles: Vehicle[] = [];
  tripIdTagCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  tripIdTagCharactersLength = this.tripIdTagCharacters.length;
  tripIdTagMaxLength = 7;

  vehicle: any;
  vehicleSeatsAvailableNumber: any;
  vehicleSeatsStillLeftForCurrentTrip: any;
  vehicleSeatsTakenNumber: any;

  selectedVehicleIdData = '';
  selectedTypeData = '';
  selectedBrandData = '';
  selectedColorData = '';

  currentTripId = '';
  hereMapStart = '';
  hereMapFinish = '';
  hereMapStartEditValue = '';
  hereMapFinishEditValue = '';

  locationStartSuggestions: any;
  locationStartInputValue: any;
  locationStartSelected: any;
  locationFinishInputValue: any;
  locationFinishSuggestions: any;
  locationFinishSelected: any;

  preloadingSpinnerDiameter = 42;
  preloadingSpinnerStrokeWidth = 5;
  preloadingSpinnerMode = 'indeterminate';

  areThereAnyVehicles = false;

  public isAcceptPassengersChecked = 'auto';
  public isTripStopsOnTheWayToFinalDestinationChecked = false;
  public isTripComfortableChecked = false;
  public isTripPetsAreAllowedChecked = false;
  public isTripPassengersCanSmokeChecked = false;
  public isTripQuietChecked = false;

  public currentUserFromService: any;
  public tripDriverName = '';
  public tripDriverEmail = '';

  // Seats
  vehicleSeatsAvailableValue = 0;
  seatsAvailableValue = 0;
  seatsTakenValue = 0;
  seatsFreeValue = 0;
  isSeatValueInputDisabled = false;

  priceValue = 0;
  luggageSpaceValue = 0;
  isTripActive: boolean;

  // Date values
  public readonly dateFormat = this.constant.dateFormat;
  public readonly dateFormatWithoutTime = this.constant.dateFormatWithoutTime;
  public readonly dateFormatWithoutTimeReadyForDate = this.constant.dateFormatWithoutTimeReadyForDate;
  currentDate = this.constant.currentDate;
  currentDateString = '';
  date: Date;
  createdDate: Date;
  dateDayValue: number;
  dateMonthValue: number;
  dateYearValue: number;
  dateHourValue: number;
  dateHourString: string;
  dateMinutesValue: number;
  dateMinutesString: string;
  dateInputString: string;
  tripDate: any;
  tripTime: any;

  @ViewChild('tripFromLocation') tripFromLocation: ElementRef;
  @ViewChild('tripToLocation') tripToLocation: ElementRef;
  @ViewChild('swapLocationButton') swapLocationButton: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('tripDateInput') tripDateInput: ElementRef;
  @ViewChild('tripDatePicker') tripDatePicker;
  @ViewChild('dateHour') dateHour: NumberPickerComponent;
  @ViewChild('dateMinutes') dateMinutes: NumberPickerComponent;

  get addTripFormStepperFormArray(): AbstractControl | null {
    return this.addTripFormStepperForm.get('addTripFormStepperFormArray');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedTripData: any,
    private vehicleService: VehicleService,
    private tripService: TripService,
    private formBuilder: FormBuilder,
    public constant: ConstantsService,
    private cdref: ChangeDetectorRef,
    private datePipe: DatePipe,
    private titleService: Title,
    public authService: FirebaseAuthService,
    public hereMap: HereMapsService,
    private _snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<EditTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    this.currentUser = this.authService.currentUserData;

    this.fetchVehicle(this.selectedTripData.selectedVehicle);

    if (this.currentTripId === '') {
      this.currentTripId = this.createTripIdTag();
    } else {
      this.currentTripId = selectedTripData.tripIdTag;
    }

    this.addTripFormStepperForm = this.formBuilder.group({
      addTripFormStepperFormArray: this.formBuilder.array([
        this.formBuilder.group({
          belongsToUser: this.selectedTripData.belongsToUser,
          selectedVehicle: ['Moj avto', Validators.required],
          tripIdTag: this.selectedTripData.tripIdTag,
          tripStatus: this.selectedTripData.tripStatus,
          tripFromLocation: [this.selectedTripData.tripFromLocation, Validators.required],
          tripToLocation: [this.selectedTripData.tripToLocation, Validators.required],
          tripDateInput: this.selectedTripData.tripDate,
          tripTime: [this.constant.numberZeroPadding(this.selectedTripData.tripTime), Validators.required],
          tripFreeSeats: ['', Validators.required],
          tripPrice: ['', Validators.required],
          luggageSpaceValue: ''
        }),
        this.formBuilder.group({
          tripMessage: this.selectedTripData.tripMessage,
          tripStopsOnTheWayToFinalDestination: this.selectedTripData.tripStopsOnTheWayToFinalDestination,
          tripComfortable: this.selectedTripData.tripComfortable,
          tripPetsAreAllowed: this.selectedTripData.tripPetsAreAllowed,
          tripPassengersCanSmoke: this.selectedTripData.tripPassengersCanSmoke,
          tripQuiet: this.selectedTripData.tripQuiet
        }),
        this.formBuilder.group({
          isAcceptPassengersChecked: ''
        })
      ])
    });

    this.date = new Date(selectedTripData.tripDate);
    this.createdDate = new Date(selectedTripData.tripCreationDate);
    this.dateHourValue = this.date.getHours();
    this.dateMinutesValue = this.date.getMinutes();

    this.hereMapStartEditValue = selectedTripData.tripFromLocation;
    this.hereMapFinishEditValue = selectedTripData.tripToLocation;
    this.priceValue = selectedTripData.tripPrice;
    this.luggageSpaceValue = selectedTripData.tripLuggageSpace;
    this.isAcceptPassengersChecked = selectedTripData.tripNewPassengersAcceptance;
    this.isTripStopsOnTheWayToFinalDestinationChecked = selectedTripData.tripStopsOnTheWayToFinalDestination;
    this.isTripComfortableChecked = selectedTripData.tripComfortable;
    this.isTripPetsAreAllowedChecked = selectedTripData.tripPetsAreAllowed;
    this.isTripPassengersCanSmokeChecked = selectedTripData.tripPassengersCanSmoke;
    this.isTripQuietChecked = selectedTripData.tripQuiet;
    this.currentDateString = this.datePipe.transform(this.currentDate, this.dateFormat);
    this.selectedVehicleIdData = this.selectedTripData.selectedVehicle;

    this.seatsAvailableValue = selectedTripData.tripAvailableSeats;
    this.seatsTakenValue = selectedTripData.tripTakenSeats;
    this.seatsFreeValue = selectedTripData.tripFreeSeats;

    this.constant.numberZeroPadding(this.dateHourValue);
    this.constant.numberZeroPadding(this.dateMinutesValue);

    this.titleService.setTitle('Urejanje potovanja #' +
    selectedTripData.tripIdTag +
    ': ' + this.hereMapStartEditValue +
    ' - ' + this.hereMapFinishEditValue);

    this.snackBarStringForWhenEditIsOver = 'Uredili ste potovanje: ' + selectedTripData.tripIdTag + '.';
    this.currentUserFromService = this.authService.getUserData;
    this.tripDriverName = this.authService.userOnlyName;
    this.tripDriverEmail = this.currentUser.providerData[0].email;
  }

  private readonly snackBarStringForWhenEditIsOver: string;
  private readonly snackBarStringForWhenSeatsTakenHigherSeatsAvailable = 'Na tem potovanju že imate vse sedeže zapolnjene in ne morate spremeniti količino prostih mest.';

  private openSnackBar(): void {
    this._snackBar.open(this.snackBarStringForWhenSeatsTakenHigherSeatsAvailable, 'Zapri', {
      duration: 7500,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  private openSnackBarWhenEditIsOver(): void {
    this._snackBar.open(this.snackBarStringForWhenEditIsOver, 'Zapri', {
      duration: 7500,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  public ngOnInit(): void {
    this.fetchVehicles();
    this.isVehicleListEmpty();
  }

  ngAfterViewInit() {
    this.hereMapStart = this.hereMapStartEditValue;
    this.hereMapFinish = this.hereMapFinishEditValue;
    this.cdref.detectChanges();
  }

  stepperGoPreviousStep() {
    this.stepper.previous();
  }

  stepperGoNextStep() {
    this.stepper.next();
  }

  // START LOCATION SELECTION
  // [1] Get input value for start destination
  valueChangeStartDestination(event) {
    this.locationStartInputValue = event.target.value;
    this.showStartLocationSuggestions(this.locationStartInputValue);
  }

  // [2] Show start location suggestions
  showStartLocationSuggestions(location) {
    this.hereMap.getCoordinates(location).then(geocoderResult => {
      this.locationStartSuggestions = geocoderResult;
    });
  }

  selectStartLocationSuggestion(selectedStartLocation) {
    this.hereMapStart = selectedStartLocation;
  }

  // FINISH LOCATION SELECTION
  // [1] Get input value for finish destination
  valueChangeFinishDestination(event) {
    this.locationFinishInputValue = event.target.value;
    this.showFinishLocationSuggestions(this.locationFinishInputValue);
  }

  // [2] Show finish location suggestions
  showFinishLocationSuggestions(location) {
    this.hereMap.getCoordinates(location).then(geocoderResult => {
      this.locationFinishSuggestions = geocoderResult;
    });
  }

  selectFinishLocationSuggestion(selectedFinishLocation) {
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
  createTripIdTag() {
    let tripIdTag = '';
    for (let i = 0; i < this.tripIdTagMaxLength; i++) {
      tripIdTag += this.tripIdTagCharacters.charAt(Math.floor(Math.random() * this.tripIdTagCharactersLength));
    }
    return tripIdTag;
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
      .subscribe((data: Vehicle[]) => {
        if (data.length > 0) {
          this.vehicles = data;
        } else {
          this.vehicles = null;
        }
      });
  }

  fetchVehicle(vehicleID) {
    this.vehicleService.getVehicleById(vehicleID)
      .pipe(filter(x => !!x))
      .subscribe((selectedVehicleData) => {
        if (selectedVehicleData) {
          this.vehicle = selectedVehicleData;
          this.vehicleSeatsAvailableValue = selectedVehicleData.vehicleSeats;
          this.vehicleSeatsStillLeftForCurrentTrip = this.vehicleSeatsAvailableValue - this.vehicleSeatsTakenNumber;

        } else {
          this.vehicle = null;
        }
      });
  }

  public changeClient(value) {
    this.fetchVehicle(value);
  }

  // Check if we get some vehicles from user or not
  isVehicleListEmpty(): boolean {
    return this.areThereAnyVehicles;
  }

  // Vehicle type
  getVehicleTypes(): VehicleTypesSetup[] {
    return vehicleTypes;
  }

  selectedVehicleType(event: MatSelectChange) {
    this.selectedTypeData = event.source.value;
  }

  // Vehicle brand
  getVehicleBrands(): VehicleBrandsSetup[] {
    return vehicleBrands;
  }

  selectedVehicleBrand(event: MatSelectChange) {
    this.selectedBrandData = event.source.value;
  }

  // Vehicle color
  getVehicleColors(): VehicleColorsSetup[] {
    return vehicleColors;
  }

  selectedVehicleColor(event: MatSelectChange) {
    this.selectedColorData = event.source.value;
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

  /*
    tripDate": "2020-03-27T10:25:00.000Z",YYYY-MM-DDThh:mm:ssTZD
    this.date = new Date(selectedTripData.tripDate);
    this.dateHourValue = this.date.getHours();
    this.dateMinutesValue = this.date.getMinutes();
  */

  // Date setup
  public setDate(): Date {
    this.dateInputString =
      this.dateYearValue + '-' +
      this.constant.numberZeroPadding(this.dateMonthValue) + '-' +
      this.constant.numberZeroPadding(this.dateDayValue) + 'T' +
      this.dateHourString + ':' +
      this.dateMinutesString;
    this.date = new Date(this.dateInputString);
    return this.date; // Expected result '1995-12-17T03:24:00'
  }

  public getDateFromDatePickerInput(event: any): void {
    this.dateDayValue = event.getDate();
    this.dateMonthValue = event.getMonth() + 1; // Because getMonth() starts from 0!
    this.dateYearValue = event.getFullYear();
    this.dateHourString = this.dateHour.numberPicker.value;
    this.dateMinutesString = this.dateMinutes.numberPicker.value;
    this.setDate();
  }

  public getTimeHour(value: number): void {
    this.dateYearValue = new Date(this.tripDatePicker._validSelected._d).getFullYear();
    this.dateMonthValue = new Date(this.tripDatePicker._validSelected._d).getMonth() + 1;
    this.dateDayValue = new Date(this.tripDatePicker._validSelected._d).getDate();
    this.dateHourString = this.constant.numberZeroPadding(value);
    this.dateMinutesString = this.dateMinutes.numberPicker.value;
    this.setDate();
  }

  public getTimeMinutes(value: number): void {
    this.dateYearValue = new Date(this.tripDatePicker._validSelected._d).getFullYear();
    this.dateMonthValue = new Date(this.tripDatePicker._validSelected._d).getMonth() + 1;
    this.dateDayValue = new Date(this.tripDatePicker._validSelected._d).getDate();
    this.dateHourString = this.dateHour.numberPicker.value;
    this.dateMinutesString = this.constant.numberZeroPadding(value);
    this.setDate();
  }

  freeSeatsChanged(value: number) {
    this.seatsAvailableValue = value;

    if (this.seatsAvailableValue >= this.seatsTakenValue) {
      this.seatsFreeValue = this.seatsAvailableValue - this.seatsTakenValue;
    } else if (this.seatsTakenValue > this.seatsAvailableValue) {
      value = this.seatsTakenValue;
      this.openSnackBar();
    }
  }

  priceChanged(value: number) {
    this.priceValue = value;
  }

  luggageSpace(value: number) {
    this.luggageSpaceValue = value;
  }

  // Add vehicle on popup close
  updateTrip(
    id: string,
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
    this.tripService.updateTrip(
      id,
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
        this.openSnackBarWhenEditIsOver();
      });
  }

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
