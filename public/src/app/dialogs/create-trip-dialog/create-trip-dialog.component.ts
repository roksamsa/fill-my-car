import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
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

  createForm: FormGroup;
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

  constructor (
    public authService: AuthService,
    private tripService: TripService,
    public hereMap: HereMapsService,
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<CreateTripDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.createForm = this.fb.group({
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
  addTrip (
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
    tripFreeSeats:  Number,
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
