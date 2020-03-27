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

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.scss']
})

export class EditTripDialogComponent implements OnInit, AfterViewInit {

  addTripFormStepperForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  tripIdTagCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  tripIdTagCharactersLength = this.tripIdTagCharacters.length;
  tripIdTagMaxLength = 7;

  vehicle: any;
  vehicleSeatsAvailableNumber: any;
  vehicleSeatsStillLeftForCurrentTrip: any;
  vehicleSeatsTakenNumber: any;

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

  isTripStopsOnTheWayToFinalDestinationChecked = false;
  isTripComfortableChecked = false;
  isAcceptPassengersChecked = 'auto';

  freeSeatsValue = 0;
  takenSeatsValue = 0;
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
    private constant: ConstantsService,
    private cdref: ChangeDetectorRef,
    private datePipe: DatePipe,
    public authService: FirebaseAuthService,
    public hereMap: HereMapsService,
    public thisDialogRef: MatDialogRef<EditTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    if (this.currentTripId === '') {
      this.currentTripId = this.createTripIdTag();
    } else {
      this.currentTripId = selectedTripData.tripIdTag;
    }

    this.date = new Date(selectedTripData.tripDate);
    this.dateHourValue = this.date.getHours();
    this.dateMinutesValue = this.date.getMinutes();

    this.hereMapStartEditValue = selectedTripData.tripFromLocation;
    this.hereMapFinishEditValue = selectedTripData.tripToLocation;
    this.freeSeatsValue = selectedTripData.tripFreeSeats;
    this.priceValue = selectedTripData.tripPrice;
    this.luggageSpaceValue = selectedTripData.tripLuggageSpace;
    this.isAcceptPassengersChecked = selectedTripData.tripNewPassengersAcceptance;
    this.isTripStopsOnTheWayToFinalDestinationChecked = selectedTripData.tripStopsOnTheWayToFinalDestination;
    this.isTripComfortableChecked = selectedTripData.tripComfortable;
    this.currentDateString = this.datePipe.transform(this.currentDate, this.dateFormat);

    this.constant.numberZeroPadding(this.dateHourValue);
    this.constant.numberZeroPadding(this.dateMinutesValue);

    console.log(this.dateHourValue);
    console.log(this.dateMinutesValue);
  }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();

    this.fetchVehicle(this.selectedTripData.selectedVehicle);

    this.addTripFormStepperForm = this.formBuilder.group({
      addTripFormStepperFormArray: this.formBuilder.array([
        this.formBuilder.group({
          belongsToUser: this.selectedTripData.belongsToUser,
          selectedVehicle: [this.selectedTripData.selectedVehicle, Validators.required],
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
          tripComfortable: this.selectedTripData.tripComfortable
        }),
        this.formBuilder.group({
          isAcceptPassengersChecked: ''
        })
      ])
    });
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
  swapStartFinishLocation() {
    const data1 = this.tripFromLocation.nativeElement.value;
    const data2 = this.tripToLocation.nativeElement.value;

    if (this.tripFromLocation && this.tripFromLocation) {
      this.tripFromLocation.nativeElement.value = data2;
      this.tripToLocation.nativeElement.value = data1;
      this.hereMapStart = this.tripFromLocation.nativeElement.value;
      this.hereMapFinish = this.tripToLocation.nativeElement.value;
    } else if (this.tripFromLocation && !this.tripFromLocation) {
      this.tripFromLocation.nativeElement.value = '';
      this.tripToLocation.nativeElement.value = data1;
      this.hereMapStart = '';
      this.hereMapFinish = this.tripToLocation.nativeElement.value;
    } else if (!this.tripFromLocation && this.tripFromLocation) {
      this.tripFromLocation.nativeElement.value = data2;
      this.tripToLocation.nativeElement.value = '';
      this.hereMapStart = this.tripFromLocation.nativeElement.value;
      this.hereMapFinish = '';
    }
    this.swapLocationButton.nativeElement.onclick = this.swapStartFinishLocation();
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
          this.vehicleSeatsAvailableNumber = selectedVehicleData.vehicleSeats;
          this.vehicleSeatsStillLeftForCurrentTrip = this.vehicleSeatsAvailableNumber - this.vehicleSeatsTakenNumber;

        } else {
          this.vehicle = null;
        }
      });
  }

  changeClient(value) {
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

  tripStopsOnTheWayToFinalDestinationChange() {
    this.isTripStopsOnTheWayToFinalDestinationChecked = (this.isTripStopsOnTheWayToFinalDestinationChecked === true) ? false : true;
  }

  tripComfortableChange() {
    this.isTripComfortableChecked = (this.isTripComfortableChecked === true) ? false : true;
  }

  acceptPassengersChange(event) {
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
    console.log(this.dateInputString);
  }

  public getTimeHour(value: number): void {
    this.dateYearValue = new Date(this.tripDatePicker._validSelected._d).getFullYear();
    this.dateMonthValue = new Date(this.tripDatePicker._validSelected._d).getMonth() + 1;
    this.dateDayValue = new Date(this.tripDatePicker._validSelected._d).getDate();
    this.dateHourString = this.constant.numberZeroPadding(value);
    this.dateMinutesString = this.dateMinutes.numberPicker.value;

    this.setDate();
    console.log(this.dateInputString);
    console.log(this.tripDatePicker);
    console.log(new Date(this.tripDatePicker.yearSelected).getFullYear());
    console.log(new Date(this.tripDatePicker._validSelected._d).getMonth() + 1);
    console.log(new Date(this.tripDatePicker._validSelected._d).getDate());
  }

  public getTimeMinutes(value: number): void {
    this.dateYearValue = new Date(this.tripDatePicker._validSelected._d).getFullYear();
    this.dateMonthValue = new Date(this.tripDatePicker._validSelected._d).getMonth() + 1;
    this.dateDayValue = new Date(this.tripDatePicker._validSelected._d).getDate();
    this.dateHourString = this.dateHour.numberPicker.value;
    this.dateMinutesString = this.constant.numberZeroPadding(value);

    this.setDate();
    console.log(this.dateInputString);
  }

  freeSeatsChanged(value: number) {
    this.freeSeatsValue = value;
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
    tripDate: Date,
    tripTimeHour: string,
    tripTimeMinutes: string,
    tripFreeSeats: number,
    tripTakenSeats: number,
    tripPrice: number,
    tripLuggageSpace: number,
    tripMessage: string,
    tripComfortable: boolean,
    tripStopsOnTheWayToFinalDestination: boolean,
    tripNewPassengersAcceptance: string) {
    this.tripService.updateTrip(
      id,
      belongsToUser,
      selectedVehicle,
      tripStatus,
      tripIdTag,
      tripFromLocation,
      tripToLocation,
      tripCreationDate,
      tripDate,
      tripTimeHour,
      tripTimeMinutes,
      tripFreeSeats,
      tripTakenSeats,
      tripPrice,
      tripLuggageSpace,
      tripMessage,
      tripComfortable,
      tripStopsOnTheWayToFinalDestination,
      tripNewPassengersAcceptance).subscribe(() => {
        this.thisDialogRef.close('Confirm');
      });
  }

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
