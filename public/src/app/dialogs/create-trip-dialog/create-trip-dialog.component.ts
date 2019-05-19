import { Component, OnInit, Inject, ViewChild, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripService } from '../../core/trip/trip.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { AuthService } from '../../core/auth/auth.service';
import { HereMapsService } from '../../../app/components/here-maps/here-maps.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
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
  locationStartInput: any;
  locationStartSelected: any;
  locationFinishInput: any;
  locationFinishSuggestions: any;
  locationFinishSelected: any;

  curDate = new Date();

  @ViewChild('tripFromLocation') tripFromLocation: ElementRef;
  @ViewChild('tripToLocation') tripToLocation: ElementRef;
  @ViewChild('swapLocationButton') swapLocationButton: ElementRef;

  preloadingSpinnerDiameter = 42;
  preloadingSpinnerStrokeWidth = 5;
  preloadingSpinnerMode = 'indeterminate';

  preloadingSpinnerVisibility: boolean;

  constructor(
    public authService: AuthService,
    private tripService: TripService,
    public hereMap: HereMapsService,
    private form: FormBuilder,
    public thisDialogRef: MatDialogRef<CreateTripDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
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
    console.log(this.preloadingSpinnerVisibility);
    console.log('My trip ID: ' + this.createTripIdTag(10));
  }

  // Start location selection
  valueChangeStartDestination(event) {
    this.locationStartInput = event.target.value;
    this.showStartLocationSuggestions(this.locationStartInput);
  }

  showStartLocationSuggestions(location) {
    const queryLocationStart = this.hereMap.getCoordinates(location);
    console.log(this.hereMap.getCoordinates(location));
    return Promise.all([queryLocationStart]).then(geocoderResult => {
      this.locationStartSuggestions = geocoderResult[0];
      console.log(this.hereMap.getCoordinates(location));
    });
  }

  selectStartLocationSuggestion(value) {
    this.hereMapStart = value;
  }

  // Finish location selection
  valueChangeFinishDestination(event) {
    this.locationFinishInput = event.target.value;
    this.showFinishLocationSuggestions(this.locationFinishInput);
  }

  showFinishLocationSuggestions(location) {
    const queryLocationFinish = this.hereMap.getCoordinates(location);
    console.log(this.hereMap.getCoordinates(location));
    return Promise.all([queryLocationFinish]).then(geocoderResult => {
      this.locationFinishSuggestions = geocoderResult[0];
    });
  }

  selectFinishLocationSuggestion(value) {
    this.hereMapFinish = value;
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
      console.log('Empty as hell :D');
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
    tripDateAndTime: Date,
    tripStopsOnTheWayToFinalDestination: Boolean,
    tripCategory: String,
    tripCO2Emissions: Number,
    tripDistance: Number,
    tripDuration: Number,
    tripFreeSeats: Number,
    tripPrice: Number,
    tripLuggageSpace: Number,
    tripComfortable: Boolean,
    tripNewPassengersAcceptance: String) {
    this.tripService.addTrip(
      belongsToUser,
      selectedVehicle,
      tripIdTag = this.createTripIdTag(10),
      tripStatus,
      tripFromLocation,
      tripToLocation,
      tripDateAndTime,
      tripStopsOnTheWayToFinalDestination,
      tripCategory,
      tripCO2Emissions,
      tripDistance,
      tripDuration,
      tripFreeSeats,
      tripPrice,
      tripLuggageSpace,
      tripComfortable,
      tripNewPassengersAcceptance).subscribe(() => {
        this.thisDialogRef.close('Confirm');
      });
    console.log(belongsToUser,
      selectedVehicle,
      tripIdTag = this.createTripIdTag(10),
      tripStatus,
      tripFromLocation,
      tripToLocation,
      tripDateAndTime,
      tripStopsOnTheWayToFinalDestination,
      tripCategory,
      tripCO2Emissions,
      tripDistance,
      tripDuration,
      tripFreeSeats,
      tripPrice,
      tripLuggageSpace,
      tripComfortable,
      tripNewPassengersAcceptance);
  }

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
