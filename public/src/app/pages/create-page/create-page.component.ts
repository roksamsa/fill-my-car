import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../core/vehicle.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  createForm: FormGroup;

  constructor (
    public authService: AuthService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private router: Router) {
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
  }

  ngOnInit() {
  }

}
