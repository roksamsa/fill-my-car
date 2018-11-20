import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../core/vehicle.service';
import { Vehicle } from '../../core/vehicle.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  createForm: FormGroup;

  constructor (
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
    });
  }

  addVehicle (
    vehicleType,
    vehicleBrand,
    vehicleName,
    vehicleModelYear,
    vehicleColor,
    vehicleSeats,
    vehicleMaxLuggage) {
    this.vehicleService.addVehicle(
      vehicleType,
      vehicleBrand,
      vehicleName,
      vehicleModelYear,
      vehicleColor,
      vehicleSeats,
      vehicleMaxLuggage).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  ngOnInit() {
  }

}
