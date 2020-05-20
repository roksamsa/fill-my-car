import { Component, AfterViewInit, Inject, OnInit } from '@angular/core';
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
import { trigger, style, animate, transition } from '@angular/animations';
import { NumberPickerService } from '../../components/number-picker/number-picker.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const defaultAnimationFunction = 'ease-in-out';
export const headerFadeInAnimationTiming = '400ms';

@Component({
  selector: 'app-create-vehicle-dialog',
  templateUrl: './create-vehicle-dialog.component.html',
  styleUrls: ['./create-vehicle-dialog.component.scss'],
  animations: [
    trigger('vehicleEnterAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-50px)'
        }),
        animate(`${headerFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(`${headerFadeInAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CreateVehicleDialogComponent implements AfterViewInit, OnInit {
  isDialogOpen = false;
  createForm: FormGroup;
  vehicles: Vehicle[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  preloadingSpinnerVisibility = true;
  selectedTypeData = 'car';
  selectedColorData = 'white';
  private selectedBrandData = '';
  public selectedBrandDataWithoutSpaces: string;
  private selectedVehicleYearData = '';
  isVehicleInsuranceChecked = false;

  public inputSeatsPlaceholder = 'Test test test';
  public inputSeatsValueNumber: number;
  public vehicleSeatsValue: number;

  public inputLuggagePlaceholder: string;
  public inputLuggageValueNumber: number;
  public vehicleLuggageValue: number;

  constructor (
    public authService: FirebaseAuthService,
    private vehicleService: VehicleService,
    private numberPickerData: NumberPickerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<CreateVehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.createForm = this.fb.group({
      belongsToUser: '',
      vehicleType: [this.selectedTypeData, Validators.required],
      vehicleBrand: '',
      vehicleName: ['', Validators.required],
      vehicleModelYear: '',
      vehicleColor: this.selectedColorData,
      vehicleSeats: ['', Validators.required],
      vehicleMaxLuggage: ['', Validators.required],
      vehicleInsurance: false
    });
  }

  private snackBarStringForWhenVehicleIsCreated = 'Ustvarili ste novo vozilo.';

  private openSnackBarWhenVehicleIsCreated(): void {
    this._snackBar.open(this.snackBarStringForWhenVehicleIsCreated, 'Zapri', {
      duration: 7500,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  public ngOnInit() {
    this.isDialogOpen = true;
  }

  public ngAfterViewInit(): void {
    this.selectedTypeData = 'car';
    this.numberPickerData.changeInputPlaceholderValue(this.inputSeatsPlaceholder);
  }

  // Fetch all vehicles for specific user
  private fetchVehicles(): void {
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
  public getVehicleTypes(): VehicleTypesSetup[] {
    return vehicleTypes;
  }

  public selectedVehicleType(event: MatSelectChange) {
    event ? (this.selectedTypeData = event.value) : (this.selectedTypeData = 'car');
  }

  // Vehicle brand
  public getVehicleBrands(): VehicleBrandsSetup[] {
    return vehicleBrands;
  }

  public selectedVehicleBrand(event: MatSelectChange) {
    this.selectedBrandData = event.source.value;
    if (this.selectedBrandData.length < 0) {
      this.selectedBrandDataWithoutSpaces = '';
    } else {
      this.selectedBrandDataWithoutSpaces = this.selectedBrandData.replace(/\s/g, '-');
    }
  }

  // Vehicle color
  public getVehicleColors(): VehicleColorsSetup[] {
    return vehicleColors;
  }

  public selectedVehicleColor(event: MatSelectChange) {
    this.selectedColorData = event.source.value;
  }

  // Vehicle year model
  public getVehicleYearModel(): VehicleYearsSetup[] {
    return vehicleYears.slice().reverse();
  }

  public selectedYearModel(event: MatSelectChange) {
    this.selectedVehicleYearData = event.source.value;
  }

  // Add vehicle on popup close
  public addVehicle(
    belongsToUser: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number,
    vehicleInsurance: boolean): void {
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
        this.openSnackBarWhenVehicleIsCreated();
      });
  }

  public onNumberOfSeatsChanged(value: number): void {
    this.vehicleSeatsValue = value;
  }

  public onNumberOfLuggageChanged(value: number): void {
    this.vehicleLuggageValue = value;
  }

  public vehicleInsuranceChange(): void {
    this.isVehicleInsuranceChecked = (this.isVehicleInsuranceChecked === true ) ? false : true;
  }

  // Cancel adding vehicle on popup close
  public onCloseCancel(): void {
    this.thisDialogRef.close('Cancel');
  }
}
