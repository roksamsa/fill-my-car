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

@Component({
  selector: 'app-edit-vehicle-dialog',
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrls: ['./edit-vehicle-dialog.component.scss']
})
export class EditVehicleDialogComponent implements OnInit {

  createForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));

  selectedTypeData = '';
  selectedBrandData = '';
  selectedColorData = '';
  selectedVehicleYearData = '';

  public inputSeatsPlaceholder: string;
  public inputSeatsValueNumber: number;
  public vehicleSeatsValue: number;

  public inputLuggagePlaceholder: string;
  public inputLuggageValueNumber: number;
  public vehicleLuggageValue: number;

  constructor (
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
      vehicleMaxLuggage: selectedVehicleData.vehicleMaxLuggage
    });

    this.selectedTypeData = selectedVehicleData.vehicleType;
    this.selectedBrandData = selectedVehicleData.vehicleBrand;
    this.selectedColorData = selectedVehicleData.vehicleColor;
    this.selectedVehicleYearData = selectedVehicleData.vehicleModelYear;

    this.inputSeatsPlaceholder = 'Število sedežev';
    this.inputSeatsValueNumber = selectedVehicleData.vehicleSeats;

    this.inputLuggagePlaceholder = 'Število sedežev';
    this.inputLuggageValueNumber = selectedVehicleData.vehicleMaxLuggage;
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
    vehicleMaxLuggage: number) {
    this.vehicleService.updateVehicle(
      id,
      vehicleType,
      vehicleBrand,
      vehicleName,
      vehicleModelYear,
      vehicleColor,
      vehicleSeats,
      vehicleMaxLuggage).subscribe(() => {
        this.thisDialogRef.close('Confirm');
      });
  }

  onNumberOfSeatsChanged(value: number) {
    this.vehicleSeatsValue = value;
  }

  onNumberOfLuggageChanged(value: number) {
    this.vehicleLuggageValue = value;
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
