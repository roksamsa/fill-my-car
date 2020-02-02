import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../core/vehicle/vehicle.service';
import { Vehicle } from '../../core/vehicle/vehicle.module';
import { FirebaseAuthService } from '../../core/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { vehicleTypes, VehicleTypesSetup } from '../../core/vehicle/vehicle-data.types';
import { vehicleBrands, VehicleBrandsSetup } from '../../core/vehicle/vehicle-data.brands';
import { vehicleColors, VehicleColorsSetup } from '../../core/vehicle/vehicle-data.colors';
import { vehicleYears, VehicleYearsSetup } from '../../core/vehicle/vehicle-data.years';

@Component({
  selector: 'app-create-vehicle-dialog',
  templateUrl: './create-vehicle-dialog.component.html',
  styleUrls: ['./create-vehicle-dialog.component.scss']
})
export class CreateVehicleDialogComponent implements OnInit {

  createForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  preloadingSpinnerVisibility = true;
  selectedTypeData = 'car';
  selectedColorData = 'white';
  selectedBrandData = '';
  selectedBrandDataWithoutSpaces = '';
  selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  public inputSeatsPlaceholder: string;
  public inputSeatsValueNumber: number;
  public vehicleSeatsValue: number;

  public inputLuggagePlaceholder: string;
  public inputLuggageValueNumber: number;
  public vehicleLuggageValue: number;

  constructor (
    public authService: FirebaseAuthService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<CreateVehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.createForm = this.fb.group({
      belongsToUser: '',
      vehicleType: [this.selectedTypeData, Validators.required],
      vehicleBrand: '',
      vehicleName: '',
      vehicleModelYear: '',
      vehicleColor: this.selectedColorData,
      vehicleSeats: '',
      vehicleMaxLuggage: '',
      vehicleInsurance: false
    });
  }

  ngOnInit() {
  }

  // Fetch all vehicles for specific user
  fetchVehicles() {
    this.vehicleService.getVehicleByUser(this.currentUser.uid)
    .subscribe((data: Vehicle[]) => {
      if (data.length > 0) {
        this.vehicles = data;
        this.preloadingSpinnerVisibility = false;
      } else {
        this.vehicles = null;
        this.preloadingSpinnerVisibility = true;
      }
    });
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
    if (this.selectedBrandData.length < 0) {
      this.selectedBrandDataWithoutSpaces = '';
    } else {
      this.selectedBrandDataWithoutSpaces = this.selectedBrandData.replace(/\s/g, '-');
    }
  }

  // Vehicle color
  getVehicleColors(): VehicleColorsSetup[] {
    return vehicleColors;
  }

  selectedVehicleColor(event: MatSelectChange) {
    this.selectedColorData = event.source.value;
  }

  // Vehicle year model
  getVehicleYearModel(): VehicleYearsSetup[] {
    return vehicleYears.reverse();
  }

  selectedYearModel(event: MatSelectChange) {
    this.selectedVehicleYearData = event.source.value;
    console.log(this.selectedVehicleYearData);
  }

  // Add vehicle on popup close
  addVehicle (
    belongsToUser: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number,
    vehicleInsurance: boolean) {
    this.vehicleService.addVehicle(
      belongsToUser,
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

  // Cancel adding vehicle on popup close
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
