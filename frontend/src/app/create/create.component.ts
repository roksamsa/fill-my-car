import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
