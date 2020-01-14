import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { TripService } from '../../core/trip/trip.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { AuthService } from '../../core/auth/auth.service';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { HereMapsService } from '../../../app/components/here-maps/here-maps.service';
import { vehicleTypes, VehicleTypesSetup } from '../../core/vehicle/vehicle-data.types';
import { vehicleBrands, VehicleBrandsSetup } from '../../core/vehicle/vehicle-data.brands';
import { vehicleColors, VehicleColorsSetup } from '../../core/vehicle/vehicle-data.colors';

@Component({
  selector: 'app-create-trip-dialog',
  templateUrl: './create-trip-dialog.component.html',
  styleUrls: ['./create-trip-dialog.component.scss']
})
export class CreateTripDialogComponent implements OnInit {

  addTripFormStepperForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  tripIdTagCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  tripIdTagCharactersLength = this.tripIdTagCharacters.length;
  tripIdTagMaxLength = 10;

  selectedTypeData = '';
  selectedBrandData = '';
  selectedColorData = '';

  hereMapStart = '';
  hereMapFinish = '';

  locationStartSuggestions: any;
  locationStartInputValue: any;
  locationStartSelected: any;
  locationFinishInputValue: any;
  locationFinishSuggestions: any;
  locationFinishSelected: any;

  preloadingSpinnerDiameter = 42;
  preloadingSpinnerStrokeWidth = 5;
  preloadingSpinnerMode = 'indeterminate';

  preloadingSpinnerVisibility: boolean;

  areThereAnyVehicles = false;

  isTripStopsOnTheWayToFinalDestinationChecked = false;
  isTripComfortableChecked = false;
  isAcceptPassengersChecked = 'auto';

  timeHourValue = 0;
  timeMinutesValue = 0;
  freeSeatsValue = 0;
  priceValue = 0;
  luggageSpaceValue = 0;

  dateFormat = 'EEEE, dd. MMMM yyyy';
  dateLocale = 'sl-SI';

  @ViewChild('tripFromLocation') tripFromLocation: ElementRef;
  @ViewChild('tripToLocation') tripToLocation: ElementRef;
  @ViewChild('swapLocationButton') swapLocationButton: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addTripFormStepperForm.get('addTripFormStepperFormArray'); }

  constructor(
    public authService: AuthService,
    private vehicleService: VehicleService,
    private tripService: TripService,
    public hereMap: HereMapsService,
    private form: FormBuilder,
    public thisDialogRef: MatDialogRef<CreateTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
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
          tripComfortable: false
        }),
        this.form.group({
          isAcceptPassengersChecked: 'auto'
        })
      ])
    });
  }

  ngOnInit() {
    this.fetchVehicles();
    this.isVehicleListEmpty();
  }

  stepperGoPreviousStep() {
    this.stepper.previous();
  }

  stepperGoNextStep() {
    this.stepper.next();
  }

  // START LOCATION SELECTION
  // [1] Get input value for start destintaion
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
  // [1] Get input value for finish destintaion
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
    console.log(this.selectedTypeData);
  }

  // Vehicle brand
  getVehicleBrands(): VehicleBrandsSetup[] {
    return vehicleBrands;
  }

  selectedVehicleBrand(event: MatSelectChange) {
    this.selectedBrandData = event.source.value;
    console.log(this.selectedBrandData);
  }

  // Vehicle color
  getVehicleColors(): VehicleColorsSetup[] {
    return vehicleColors;
  }

  selectedVehicleColor(event: MatSelectChange) {
    this.selectedColorData = event.source.value;
    console.log(this.selectedColorData);
  }

  tripStopsOnTheWayToFinalDestinationChange() {
    this.isTripStopsOnTheWayToFinalDestinationChecked = (this.isTripStopsOnTheWayToFinalDestinationChecked === true ) ? false : true;
  }

  tripComfortableChange() {
    this.isTripComfortableChecked = (this.isTripComfortableChecked === true ) ? false : true;
  }

  acceptPassengersChange(event) {
    this.isAcceptPassengersChecked = event.value;
  }

  timeHourChanged(value: number) {
    this.timeHourValue = value;
  }

  timeMinutesChanged(value: number) {
    this.timeMinutesValue = value;
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
  addTrip(
    belongsToUser: String,
    selectedVehicle: String,
    tripStatus: String,
    tripIdTag: String,
    tripFromLocation: String,
    tripToLocation: String,
    tripDate: Date,
    tripTime: String,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripMessage: String,
    tripComfortable: Boolean,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripNewPassengersAcceptance: String) {
    this.tripService.addTrip(
      belongsToUser,
      selectedVehicle,
      tripStatus,
      tripIdTag = this.createTripIdTag(),
      tripFromLocation,
      tripToLocation,
      tripDate,
      tripTime,
      tripFreeSeats,
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
