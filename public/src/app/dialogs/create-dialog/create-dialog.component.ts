import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../core/vehicle.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  createForm: FormGroup;

  constructor (
    public authService: AuthService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private router: Router,
    public thisDialogRef: MatDialogRef<CreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.createForm = this.fb.group({
      vehicleType: ['', Validators.required],
      vehicleBrand: '',
      vehicleName: '',
      vehicleModelYear: '',
      vehicleColor: '',
      vehicleSeats: '',
      vehicleMaxLuggage: '',
      belongsToUser: '',
      vehicleRegistrationPlate: ''
    });
  }

  addVehicle (
    belongsToUser: any,
    vehicleRegistrationPlate: any,
    vehicleType: any,
    vehicleBrand: any,
    vehicleName: any,
    vehicleModelYear: number,
    vehicleColor: any,
    vehicleSeats: number,
    vehicleMaxLuggage: number) {
    this.vehicleService.addVehicle(
      belongsToUser,
      vehicleRegistrationPlate,
      vehicleType,
      vehicleBrand,
      vehicleName,
      vehicleModelYear,
      vehicleColor,
      vehicleSeats,
      vehicleMaxLuggage).subscribe(() => {
        this.router.navigate(['/nadzorna-plosca']);
      });
    this.thisDialogRef.close('Confirm');
  }

  ngOnInit() {
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
