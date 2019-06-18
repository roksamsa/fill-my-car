import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { AuthService } from '../../core/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { vehicleTypes, VehicleTypesSetup } from '../../core/vehicle/vehicle-data.types';
import { vehicleBrands, VehicleBrandsSetup } from '../../core/vehicle/vehicle-data.brands';
import { vehicleColors, VehicleColorsSetup } from '../../core/vehicle/vehicle-data.colors';
import { vehicleYears, VehicleYearsSetup } from '../../core/vehicle/vehicle-data.years';
import { trigger, style, animate, transition } from '@angular/animations';

export const defaultAnimationFunction = 'ease-in-out';

export const headerFadeInAnimationTiming = '300ms';
export const headerFadeOutAnimationTiming = '250ms';
export const headerAnimationDelay = '450ms';

@Component({
  selector: 'app-edit-vehicle-dialog',
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrls: ['./edit-vehicle-dialog.component.scss'],
  animations: [
    trigger('vehicleEnterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-300px)'
        }),
        animate(`${headerFadeOutAnimationTiming} ${headerAnimationDelay} ${defaultAnimationFunction}`, style({
          opacity: 1,
          transform: 'translateX(0)'
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
    ])
  ]
})
export class EditVehicleDialogComponent implements OnInit {

  createForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));

  selectedTypeData = '';
  selectedBrandData = '';
  selectedColorData = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  public inputSeatsPlaceholder: string;
  public inputSeatsValueNumber: number;
  public vehicleSeatsValue: number;

  public inputLuggagePlaceholder: string;
  public inputLuggageValueNumber: number;
  public vehicleLuggageValue: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedVehicleData: any,
    public authService: AuthService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<EditVehicleDialogComponent>) {
    this.createForm = this.fb.group({
      belongsToUser: selectedVehicleData.belongsToUser,
      vehicleType: [selectedVehicleData.vehicleType, Validators.required],
      vehicleBrand: selectedVehicleData.vehicleBrand,
      vehicleName: selectedVehicleData.vehicleName,
      vehicleModelYear: selectedVehicleData.vehicleModelYear,
      vehicleSeatsValue: selectedVehicleData.vehicleSeats,
      vehicleColor: selectedVehicleData.vehicleColor,
      vehicleMaxLuggage: selectedVehicleData.vehicleMaxLuggage,
      vehicleInsurance: selectedVehicleData.vehicleInsurance
    });

    this.selectedTypeData = selectedVehicleData.vehicleType;
    this.selectedBrandData = selectedVehicleData.vehicleBrand;
    this.selectedColorData = selectedVehicleData.vehicleColor;
    this.selectedVehicleYearData = selectedVehicleData.vehicleModelYear;

    this.inputSeatsPlaceholder = 'Število sedežev';
    this.inputSeatsValueNumber = selectedVehicleData.vehicleSeats;

    this.inputLuggagePlaceholder = 'Število sedežev';
    this.inputLuggageValueNumber = selectedVehicleData.vehicleMaxLuggage;

    this.isVehicleInsuranceChecked = selectedVehicleData.vehicleInsurance;
  }

  ngOnInit() {
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
      .subscribe((selectedVehicleData: Vehicle[]) => {
        if (selectedVehicleData.length > 0) {
          this.vehicles = selectedVehicleData;
        } else {
          this.vehicles = null;
        }
      });
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

  // Vehicle year model
  getVehicleYearModel(): VehicleYearsSetup[] {
    return vehicleYears.reverse();
  }

  selectedYearModel(event: MatSelectChange) {
    this.selectedVehicleYearData = event.source.value;
    console.log(this.selectedVehicleYearData);
  }

  updateVehicle (
    id: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number,
    vehicleInsurance: boolean) {
    this.vehicleService.updateVehicle(
      id,
      vehicleType,
      vehicleBrand,
      vehicleName,
      vehicleModelYear,
      vehicleColor,
      vehicleSeats,
      vehicleMaxLuggage,
      vehicleInsurance).subscribe(() => {
        this.thisDialogRef.close('Confirm');
      });
  }

  onNumberOfSeatsChanged(value: number) {
    this.vehicleSeatsValue = value;
  }

  onNumberOfLuggageChanged(value: number) {
    this.vehicleLuggageValue = value;
  }

  vehicleInsuranceChange() {
    this.isVehicleInsuranceChecked = (this.isVehicleInsuranceChecked === true ) ? false : true;
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
