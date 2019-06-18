import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { MatStepper } from '@angular/material/stepper';
import { TripService } from '../../core/trip/trip.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { AuthService } from '../../core/auth/auth.service';
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

  addTripFormStep1: FormGroup;
  addTripFormStep2: FormGroup;
  addTripFormStep3: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  tripIdTagCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  tripIdTagCharactersLength = this.tripIdTagCharacters.length;

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

  @ViewChild('tripFromLocation') tripFromLocation: ElementRef;
  @ViewChild('tripToLocation') tripToLocation: ElementRef;
  @ViewChild('swapLocationButton') swapLocationButton: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    public authService: AuthService,
    private tripService: TripService,
    public hereMap: HereMapsService,
    private form: FormBuilder,
    public thisDialogRef: MatDialogRef<CreateTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.addTripFormStep1 = this.form.group({
      belongsToUser: '',
      selectedVehicle: ['', Validators.required],
      tripIdTag: '',
      tripStatus: '',
      tripFromLocation: '',
      tripToLocation: '',
      tripDateAndTime: '',
      tripStopsOnTheWayToFinalDestination: '',
      tripCategory: '',
      tripCO2Emissions: '',
      tripDistance: '',
      tripDuration: '',
      tripFreeSeats: '',
      tripPrice: '',
      tripLuggageSpace: '',
      tripComfortable: '',
      tripNewPassengersAcceptance: ''
    });
    this.addTripFormStep2 = this.form.group({
      belongsToUser: '',
      selectedVehicle: ['', Validators.required],
      tripIdTag: '',
      tripStatus: '',
      tripFromLocation: '',
      tripToLocation: '',
      tripDateAndTime: '',
      tripStopsOnTheWayToFinalDestination: '',
      tripCategory: '',
      tripCO2Emissions: '',
      tripDistance: '',
      tripDuration: '',
      tripFreeSeats: '',
      tripPrice: '',
      tripLuggageSpace: '',
      tripComfortable: '',
      tripNewPassengersAcceptance: ''
    });
    this.addTripFormStep3 = this.form.group({
      belongsToUser: '',
      selectedVehicle: ['', Validators.required],
      tripIdTag: '',
      tripStatus: '',
      tripFromLocation: '',
      tripToLocation: '',
      tripDateAndTime: '',
      tripStopsOnTheWayToFinalDestination: '',
      tripCategory: '',
      tripCO2Emissions: '',
      tripDistance: '',
      tripDuration: '',
      tripFreeSeats: '',
      tripPrice: '',
      tripLuggageSpace: '',
      tripComfortable: '',
      tripNewPassengersAcceptance: ''
    });
  }

  ngOnInit() {
    this.hereMap.hereMapLoading.subscribe(message => this.preloadingSpinnerVisibility = message);
    console.log('My trip ID: ' + this.createTripIdTag(10));
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

    if (this.tripFromLocation.nativeElement !== undefined || this.tripToLocation.nativeElement !== undefined) {
      this.tripFromLocation.nativeElement.value = data2;
      this.tripToLocation.nativeElement.value = data1;
      this.hereMapStart = data2;
      this.hereMapFinish = data1;
      this.swapLocationButton.nativeElement.onclick = this.swapStartFinishLocation();
    } else {
      console.log('Empty as hell :D'); // TODO
    }
  }

  // Generate random ID for trip
  createTripIdTag(length: number) {
    let tripIdTag = '';
    for (let i = 0; i < length; i++) {
      tripIdTag += this.tripIdTagCharacters.charAt(Math.floor(Math.random() * this.tripIdTagCharactersLength));
    }
    return tripIdTag;
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

  // Add vehicle on popup close
  addTrip(
    belongsToUser: String,
    selectedVehicle: String,
    tripIdTag: String,
    tripStatus: String,
    tripFromLocation: String,
    tripToLocation: String,
    tripDate: Date,
    tripTime: String,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripComfortable: Boolean,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripNewPassengersAcceptance: String) {
    this.tripService.addTrip(
      belongsToUser,
      selectedVehicle,
      tripIdTag = this.createTripIdTag(10),
      tripStatus,
      tripFromLocation,
      tripToLocation,
      tripDate,
      tripTime,
      tripStopsOnTheWayToFinalDestination,
      tripFreeSeats,
      tripPrice,
      tripLuggageSpace,
      tripComfortable,
      tripNewPassengersAcceptance).subscribe(() => {
        this.thisDialogRef.close('Confirm');
      });
  }

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
