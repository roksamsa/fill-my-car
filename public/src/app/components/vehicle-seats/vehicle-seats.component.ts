import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-seats',
  templateUrl: './vehicle-seats.component.html',
  styleUrls: ['./vehicle-seats.component.scss']
})
export class VehicleSeatsComponent implements OnInit, AfterViewInit {

  vehicleSeatsTakenNumberValue: number[];
  vehicleSeatsAvailableNumberValue: number[];
  @Input() vehicleSeatsTakenNumber: any;
  @Input() vehicleSeatsAvailableNumber: any;

  constructor() {
  }

  ngOnInit() {
    this.vehicleSeatsTakenNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsTakenNumber);
    this.vehicleSeatsAvailableNumberValue = this.generateArrayFromVehicleSeatsNumber(this.vehicleSeatsAvailableNumber);
  }

  ngAfterViewInit() {
  }

  generateArrayFromVehicleSeatsNumber(number) {
    return Array.from(Array(number)).map((x, i) => i);
  }
}
